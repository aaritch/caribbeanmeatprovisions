import { NextResponse } from 'next/server';
import { newsletterSubscriptionSchema, flattenZodErrors } from '@/lib/validation';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { saveNewsletterSubscription } from '@/lib/persistence';
import { sendNewsletterConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';

const HEADERS = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_json' }, { status: 400, headers: HEADERS });
  }

  const parsed = newsletterSubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'validation_failed', fieldErrors: flattenZodErrors(parsed.error) },
      { status: 400, headers: HEADERS },
    );
  }
  const data = parsed.data;
  const ip = getClientIp(req.headers);

  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ success: true }, { headers: HEADERS });
  }

  const rl = checkRateLimit(`newsletter:${ip}`, 3, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: 'rate_limited', retryAfter: rl.retryAfter },
      { status: 429, headers: { ...HEADERS, 'Retry-After': String(rl.retryAfter) } },
    );
  }

  const tsOk = await verifyTurnstileToken(data.turnstileToken ?? '', ip);
  if (!tsOk) {
    return NextResponse.json({ success: false, error: 'turnstile_failed' }, { status: 400, headers: HEADERS });
  }

  const result = await saveNewsletterSubscription(data);
  if (!result.alreadyConfirmed) {
    Promise.allSettled([sendNewsletterConfirmation(data.email, result.token)]).then((rs) => {
      for (const r of rs) {
        if (r.status === 'rejected') console.error('[/api/newsletter] email rejected', r.reason);
      }
    });
  }

  return NextResponse.json({ success: true }, { headers: HEADERS });
}
