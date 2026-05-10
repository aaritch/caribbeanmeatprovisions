// Resend wrapper. If RESEND_API_KEY is unset, sends are skipped (logged only).
// Email failures never bubble up to the user — DB write is the source of truth.

import { Resend } from 'resend';
import { SalesNotificationEmail } from '@/emails/sales-notification';
import { QuoteAcknowledgmentEmail } from '@/emails/quote-acknowledgment';
import { ContactNotificationEmail } from '@/emails/contact-notification';
import { NewsletterConfirmationEmail } from '@/emails/newsletter-confirmation';
import type { ContactMessageInput, QuoteRequestInput } from './validation';
import type { Product } from '@/types';

const FROM = process.env.EMAIL_FROM ?? 'noreply@caribbeanmeatprovisions.com';
const TO_SALES = process.env.EMAIL_TO_SALES ?? 'sales@caribbeanmeatprovisions.com';
const REPLY_TO = process.env.EMAIL_REPLY_TO ?? TO_SALES;

let resend: Resend | null = null;
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resend) resend = new Resend(key);
  return resend;
}

async function sendWithRetry(send: () => Promise<unknown>, label: string): Promise<void> {
  const client = getClient();
  if (!client) {
    console.warn(`[email] RESEND_API_KEY unset — skipping ${label}`);
    return;
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await send();
      return;
    } catch (err) {
      console.error(`[email] ${label} attempt ${attempt + 1} failed`, err);
      if (attempt === 0) await new Promise((r) => setTimeout(r, 200 + Math.random() * 800));
    }
  }
}

export async function sendSalesNotification(
  quote: QuoteRequestInput,
  quoteId: string,
  products: Product[],
): Promise<void> {
  await sendWithRetry(
    () =>
      getClient()!.emails.send({
        from: FROM,
        to: TO_SALES,
        replyTo: quote.email,
        subject: `New Quote Request — ${quote.companyName} (${quote.country})`,
        react: SalesNotificationEmail({ quote, quoteId, products }),
      }),
    'sales notification',
  );
}

export async function sendQuoteAcknowledgment(quote: QuoteRequestInput): Promise<void> {
  await sendWithRetry(
    () =>
      getClient()!.emails.send({
        from: FROM,
        to: quote.email,
        replyTo: REPLY_TO,
        subject: 'We received your quote request — Caribbean Meat Provisions',
        react: QuoteAcknowledgmentEmail({
          contactName: quote.contactName,
          companyName: quote.companyName,
        }),
      }),
    'quote acknowledgment',
  );
}

export async function sendContactNotification(
  message: ContactMessageInput,
  messageId: string,
): Promise<void> {
  await sendWithRetry(
    () =>
      getClient()!.emails.send({
        from: FROM,
        to: TO_SALES,
        replyTo: message.email,
        subject: `New contact message — ${message.subject}`,
        react: ContactNotificationEmail({ message, messageId }),
      }),
    'contact notification',
  );
}

export async function sendNewsletterConfirmation(email: string, token: string): Promise<void> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const confirmUrl = `${base.replace(/\/$/, '')}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  await sendWithRetry(
    () =>
      getClient()!.emails.send({
        from: FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: 'Confirm your subscription to Caribbean Meat Provisions',
        react: NewsletterConfirmationEmail({ confirmUrl }),
      }),
    'newsletter confirmation',
  );
}
