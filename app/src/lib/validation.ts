import { z } from 'zod';

export const quoteRequestSchema = z
  .object({
    companyName: z.string().trim().min(2).max(200),
    companyType: z.string().trim().min(1),
    contactName: z.string().trim().min(2).max(100),
    jobTitle: z.string().trim().max(100).optional().or(z.literal('')),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().min(7).max(30),
    country: z.string().trim().min(2),
    destinationPort: z.string().trim().min(2).max(100),
    productSlugs: z.array(z.string().trim().min(1)).default([]),
    otherProductsText: z.string().trim().max(500).optional().or(z.literal('')),
    estimatedVolume: z.string().trim().max(200).optional().or(z.literal('')),
    requiredByDate: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine(
        (v) => {
          if (!v) return true;
          const d = new Date(v);
          return !Number.isNaN(d.getTime()) && d > new Date();
        },
        { message: 'Required-by date must be in the future.' },
      ),
    urgency: z.enum(['standard', 'expedited', 'jit']),
    halalRequired: z.boolean().default(false),
    additionalNotes: z.string().trim().max(2000).optional().or(z.literal('')),
    marketingConsent: z.boolean().default(false),
    // Honeypot: accept any value at the schema level. The route bails silently on non-empty.
    honeypot: z.string().optional().or(z.literal('')),
    turnstileToken: z.string().optional().or(z.literal('')),
  })
  .refine((d) => (d.productSlugs?.length ?? 0) > 0 || (d.otherProductsText?.trim().length ?? 0) > 0, {
    message: 'Select at least one product or describe what you need.',
    path: ['productSlugs'],
  });

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
  honeypot: z.string().optional().or(z.literal('')),
  turnstileToken: z.string().optional().or(z.literal('')),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().email().max(200),
  honeypot: z.string().optional().or(z.literal('')),
  turnstileToken: z.string().optional().or(z.literal('')),
});

export type NewsletterSubscriptionInput = z.infer<typeof newsletterSubscriptionSchema>;

export function flattenZodErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join('.') || '_root';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
