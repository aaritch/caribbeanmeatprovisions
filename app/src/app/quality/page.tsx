import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABand } from '@/components/shared/CTABand';
import { CertificationBadge } from '@/components/product/CertificationBadge';
import { getCertifications } from '@/lib/data';
import { Snowflake, Thermometer, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certifications & Cold-Chain Compliance',
  description:
    'HACCP, USDA, ISO 22000, BRC, FSSC 22000, Halal, and FDA certifications. Cold chain integrity from blast freezer to port-of-arrival, with full documentation.',
  alternates: { canonical: '/quality' },
};

const COLD_CHAIN = [
  {
    icon: Snowflake,
    title: 'Blast freezing',
    body: 'Rapid -18°C blast freezing locks in cellular integrity, texture, and shelf life. No slow-frozen, no compromise.',
  },
  {
    icon: Thermometer,
    title: 'Temperature monitoring',
    body: 'Reefer-container IoT/RFID temperature tracking with real-time alerts and full transit-history records on demand.',
  },
  {
    icon: Truck,
    title: 'Last-mile integrity',
    body: 'Refrigerated trucking and pre-cooled storage at the destination port keeps the chain unbroken through customs and delivery.',
  },
];

const DOCUMENTATION = [
  'Certificate of origin',
  'Health certificate (veterinary)',
  'Halal certificate (where applicable)',
  'HACCP / quality certificate',
  'Phytosanitary certificate (where applicable)',
  'Packing list and commercial invoice',
  'Pre-shipment inspection report',
  'Bill of lading',
];

export default function QualityPage() {
  const certs = getCertifications();
  return (
    <>
      <PageHeader
        eyebrow="Quality & Compliance"
        title="Certified, compliant, cold-chain verified."
        subtitle="Certifications and documentation are non-negotiable in the meat trade. Here is the paperwork pack we routinely supply, the certifications we hold, and the cold-chain controls behind every shipment."
      />

      <section className="container-x py-16">
        <SectionHeading eyebrow="Certifications" title="The certifications we hold." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certs.map((c) => (
            <article
              key={c.slug}
              className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <CertificationBadge certification={c} size="md" />
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  {c.issuingBody.split(',')[0]}
                </span>
              </div>
              <h3 className="font-serif text-xl text-brand-charcoal">{c.name}</h3>
              <p className="text-sm text-neutral-700">{c.description}</p>
              {c.certificatePdfUrl ? (
                <a
                  href={c.certificatePdfUrl}
                  className="mt-auto inline-flex text-sm font-semibold text-brand-primary hover:underline"
                >
                  Download certificate (PDF) →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="container-x py-16">
          <SectionHeading eyebrow="Cold chain" title="Three controls. One unbroken chain." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {COLD_CHAIN.map((c) => (
              <div key={c.title} className="rounded-lg bg-white p-6 shadow-sm">
                <c.icon className="h-8 w-8 text-brand-primary" aria-hidden />
                <h3 className="mt-4 font-serif text-xl text-brand-charcoal">{c.title}</h3>
                <p className="mt-2 text-sm text-neutral-700">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Traceability" title="From origin to port-of-arrival." />
            <p className="mt-4 text-neutral-700">
              Every batch is traceable from production lot through processing, packaging, and
              port-of-arrival. Lot codes link the carton on your dock back to the slaughter date,
              processing facility, and consolidation manifest.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Documentation" title="What we provide with every shipment." />
            <ul className="mt-4 grid gap-2 text-sm text-neutral-800">
              {DOCUMENTATION.map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary" aria-hidden />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
