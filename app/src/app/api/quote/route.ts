import { NextResponse } from 'next/server';
import { quoteRequestSchema, flattenZodErrors } from '@/lib/validation';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { saveQuoteRequest } from '@/lib/persistence';
import { sendSalesNotification, sendQuoteAcknowledgment } from '@/lib/email';
import { getProductBySlug } from '@/lib/data';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';

const COMMON_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json',
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'invalid_json' },
      { status: 400, headers: COMMON_HEADERS },
    );
  }

  const ip = getClientIp(req.headers);
  const userAgent = req.headers.get('user-agent') ?? undefined;

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'validation_failed',
        fieldErrors: flattenZodErrors(parsed.error),
      },
      { status: 400, headers: COMMON_HEADERS },
    );
  }
  const data = parsed.data;

  // Honeypot — silently succeed without writing.
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json(
      { success: true, quoteId: 'skipped' },
      { headers: COMMON_HEADERS },
    );
  }

  // Rate limit: 5 / hour / IP.
  const rl = checkRateLimit(`quote:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: 'rate_limited', retryAfter: rl.retryAfter },
      { status: 429, headers: { ...COMMON_HEADERS, 'Retry-After': String(rl.retryAfter) } },
    );
  }

  // Turnstile (bypassed when secret unset).
  const tsOk = await verifyTurnstileToken(data.turnstileToken ?? '', ip);
  if (!tsOk) {
    return NextResponse.json(
      { success: false, error: 'turnstile_failed' },
      { status: 400, headers: COMMON_HEADERS },
    );
  }

  // Resolve product slugs to real products. Slugs come in as `{category}-{slug}`.
  const products: Product[] = [];
  for (const composite of data.productSlugs ?? []) {
    const dash = composite.indexOf('-');
    if (dash < 0) continue;
    const category = composite.slice(0, dash);
    const slug = composite.slice(dash + 1);
    const p = getProductBySlug(category, slug);
    if (p) products.push(p);
  }

  let saved;
  try {
    saved = await saveQuoteRequest(data, { ip, userAgent });
  } catch (err) {
    console.error('[/api/quote] persistence error', err);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Could not save quote.' },
      { status: 500, headers: COMMON_HEADERS },
    );
  }

  // Fire-and-log emails. Never block the response.
  Promise.allSettled([
    sendSalesNotification(data, saved.id, products),
    sendQuoteAcknowledgment(data),
  ]).then((results) => {
    for (const r of results) {
      if (r.status === 'rejected') console.error('[/api/quote] email rejected', r.reason);
    }
  });

  return NextResponse.json(
    { success: true, quoteId: saved.id },
    { headers: COMMON_HEADERS },
  );
}
