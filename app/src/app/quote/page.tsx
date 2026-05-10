import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { getAllProducts, getCountriesForForm } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Request a wholesale quote for Caribbean delivery — beef, pork, poultry, lamb, mutton. Tell us your destination port, urgency, and volume.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage() {
  const countries = getCountriesForForm();
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need."
        subtitle="A member of our sales team responds within one business day. Urgent? Call the sales line."
      />

      <section className="container-x py-12">
        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-lg bg-neutral-100" aria-hidden />}
        >
          <QuoteForm countries={countries} products={products} />
        </Suspense>
      </section>
    </>
  );
}
