import { NextResponse } from 'next/server';
import { contactMessageSchema, flattenZodErrors } from '@/lib/validation';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { saveContactMessage } from '@/lib/persistence';
import { sendContactNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

const HEADERS = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_json' }, { status: 400, headers: HEADERS });
  }

  const ip = getClientIp(req.headers);
  const userAgent = req.headers.get('user-agent') ?? undefined;

  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'validation_failed', fieldErrors: flattenZodErrors(parsed.error) },
      { status: 400, headers: HEADERS },
    );
  }
  const data = parsed.data;

  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ success: true, messageId: 'skipped' }, { headers: HEADERS });
  }

  const rl = checkRateLimit(`contact:${ip}`, 10, 3600);
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

  let saved;
  try {
    saved = await saveContactMessage(data, { ip, userAgent });
  } catch (err) {
    console.error('[/api/contact] persistence error', err);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Could not save message.' },
      { status: 500, headers: HEADERS },
    );
  }

  Promise.allSettled([sendContactNotification(data, saved.id)]).then((results) => {
    for (const r of results) {
      if (r.status === 'rejected') console.error('[/api/contact] email rejected', r.reason);
    }
  });

  return NextResponse.json({ success: true, messageId: saved.id }, { headers: HEADERS });
}
