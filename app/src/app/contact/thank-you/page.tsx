import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your message has been received.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/contact/thank-you' },
};

export default function ContactThankYou() {
  return (
    <section className="container-x py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" aria-hidden />
      <h1 className="mt-6 font-serif text-h1 text-brand-charcoal">Thanks — message received.</h1>
      <p className="mx-auto mt-4 max-w-prose text-neutral-600">
        We respond within one business day. Urgent matters? Call our sales line.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" variant="primary">Back home</LinkButton>
        <LinkButton href="/products" variant="secondary">Browse products</LinkButton>
      </div>
    </section>
  );
}
