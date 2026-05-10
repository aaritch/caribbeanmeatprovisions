import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Subscription confirmed',
  description: 'Your newsletter subscription is confirmed.',
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmed() {
  return (
    <section className="container-x py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" aria-hidden />
      <h1 className="mt-6 font-serif text-h1 text-brand-charcoal">You’re on the list.</h1>
      <p className="mx-auto mt-4 max-w-prose text-neutral-600">
        We’ll send periodic specials and Caribbean trade updates. You can unsubscribe any time.
      </p>
      <div className="mt-8">
        <LinkButton href="/" variant="primary">Back home</LinkButton>
      </div>
    </section>
  );
}
