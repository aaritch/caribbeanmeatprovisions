// Persistence stubs.
// TODO: swap each function body for `prisma.<model>.create(...)` once Prisma client is generated.
// Until then, payloads are logged to the server console with a generated id.

import { randomBytes } from 'node:crypto';
import type { ContactMessageInput, NewsletterSubscriptionInput, QuoteRequestInput } from './validation';

function generateId(): string {
  return randomBytes(12).toString('base64url');
}

export interface SaveQuoteResult {
  id: string;
}

export async function saveQuoteRequest(
  data: QuoteRequestInput,
  meta: { ip?: string; userAgent?: string },
): Promise<SaveQuoteResult> {
  const id = generateId();
  console.log('[persistence] quote request', {
    id,
    companyName: data.companyName,
    email: data.email,
    country: data.country,
    productSlugs: data.productSlugs,
    urgency: data.urgency,
    ip: meta.ip,
    ua: meta.userAgent,
  });
  return { id };
}

export interface SaveContactResult {
  id: string;
}

export async function saveContactMessage(
  data: ContactMessageInput,
  meta: { ip?: string; userAgent?: string },
): Promise<SaveContactResult> {
  const id = generateId();
  console.log('[persistence] contact message', {
    id,
    email: data.email,
    subject: data.subject,
    ip: meta.ip,
    ua: meta.userAgent,
  });
  return { id };
}

export interface SaveNewsletterResult {
  id: string;
  token: string;
  alreadyConfirmed: boolean;
}

const subscribers = new Map<string, { id: string; token: string; confirmedAt: Date | null }>();

export async function saveNewsletterSubscription(
  data: NewsletterSubscriptionInput,
): Promise<SaveNewsletterResult> {
  const existing = subscribers.get(data.email);
  if (existing && existing.confirmedAt) {
    console.log('[persistence] newsletter already confirmed', { email: data.email });
    return { id: existing.id, token: '', alreadyConfirmed: true };
  }
  const id = existing?.id ?? generateId();
  const token = randomBytes(24).toString('base64url');
  subscribers.set(data.email, { id, token, confirmedAt: null });
  console.log('[persistence] newsletter subscription pending', { id, email: data.email });
  return { id, token, alreadyConfirmed: false };
}

export async function confirmNewsletterSubscription(
  token: string,
): Promise<{ ok: boolean; email?: string }> {
  for (const [email, entry] of subscribers.entries()) {
    if (entry.token === token) {
      entry.confirmedAt = new Date();
      console.log('[persistence] newsletter confirmed', { id: entry.id, email });
      return { ok: true, email };
    }
  }
  return { ok: false };
}
