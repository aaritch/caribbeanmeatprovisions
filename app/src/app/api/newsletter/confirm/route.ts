import { NextResponse } from 'next/server';
import { confirmNewsletterSubscription } from '@/lib/persistence';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') ?? '';
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  if (!token) {
    return NextResponse.redirect(`${base}/newsletter/error`);
  }
  const result = await confirmNewsletterSubscription(token);
  return NextResponse.redirect(`${base}${result.ok ? '/newsletter/confirmed' : '/newsletter/error'}`);
}
