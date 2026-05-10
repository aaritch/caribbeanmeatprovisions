import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { CategoryTile } from '@/components/product/CategoryTile';
import { getAllCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your quote request has been received.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/quote/thank-you' },
};

export default function QuoteThankYou() {
  const cats = getAllCategories().slice(0, 3);
  return (
    <>
      <section className="container-x py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" aria-hidden />
        <h1 className="mt-6 font-serif text-h1 text-brand-charcoal">Thanks — we’ll be in touch.</h1>
        <p className="mx-auto mt-4 max-w-prose text-neutral-600">
          A member of our sales team will respond within one business day with availability,
          pricing, and lead time. Check your inbox for an acknowledgment.
        </p>
        <div className="mt-8">
          <LinkButton href="/" variant="primary">Back home</LinkButton>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="container-x py-14">
          <p className="text-center text-sm uppercase tracking-wider text-neutral-500">
            While you’re here
          </p>
          <h2 className="mt-2 text-center font-serif text-h3 text-brand-charcoal">
            Browse other categories
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c) => (
              <CategoryTile key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
