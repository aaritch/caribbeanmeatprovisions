import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getCertifications } from '@/lib/data';

export function CertificationsBand() {
  const certs = getCertifications().slice(0, 7);
  return (
    <section className="container-x py-16">
      <SectionHeading
        eyebrow="Quality"
        title="Certified, compliant, cold-chain verified."
        align="center"
      />
      <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
        {certs.map((c) => (
          <li
            key={c.slug}
            className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-charcoal"
            title={c.name}
          >
            {c.shortName}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link
          href="/quality"
          className="inline-flex items-center gap-1 font-semibold text-brand-primary hover:underline"
        >
          See all certifications
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </section>
  );
}
