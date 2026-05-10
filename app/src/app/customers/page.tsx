import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { CTABand } from '@/components/shared/CTABand';
import { getCustomerTypes } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Customers We Serve',
  description:
    'Hotels, resorts, restaurants, distributors, supermarkets, cruise lines, and institutional buyers. Built for the way Caribbean foodservice and retail operate.',
  alternates: { canonical: '/customers' },
};

export default function CustomersPage() {
  const types = getCustomerTypes();
  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title="The Caribbean buyers we work with every week."
        subtitle="Six customer profiles. Different volumes, different SLAs, different documentation needs — but the same expectation of consistency, certifications, and cold-chain integrity."
      />

      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {types.map((t) => (
            <article
              key={t.slug}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-neutral-100">
                <Image
                  src={t.imageUrl}
                  alt={t.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl text-brand-charcoal">{t.name}</h2>
                <p className="mt-2 text-sm text-neutral-700">{t.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
