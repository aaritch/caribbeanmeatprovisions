import type { Metadata } from 'next';
import { AlertCircle } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Confirmation link invalid',
  description: 'That confirmation link is invalid or expired.',
  robots: { index: false, follow: false },
};

export default function NewsletterError() {
  return (
    <section className="container-x py-20 text-center">
      <AlertCircle className="mx-auto h-16 w-16 text-brand-primary" aria-hidden />
      <h1 className="mt-6 font-serif text-h1 text-brand-charcoal">Link invalid or expired.</h1>
      <p className="mx-auto mt-4 max-w-prose text-neutral-600">
        Try subscribing again from any page footer. If this keeps happening, get in touch.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" variant="primary">Back home</LinkButton>
        <LinkButton href="/contact" variant="secondary">Contact us</LinkButton>
      </div>
    </section>
  );
}
