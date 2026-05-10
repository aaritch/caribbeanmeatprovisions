import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABand } from '@/components/shared/CTABand';
import {
  Anchor,
  Boxes,
  ClipboardCheck,
  Container,
  Layers,
  Snowflake,
  Truck,
  Warehouse,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Logistics, Consolidation & 3PL',
  description:
    'Direct shipping, consolidation, cross-dock, and third-party logistics across the Caribbean. Standard, expedited, and just-in-time tiers backed by certified cold-chain.',
  alternates: { canonical: '/logistics' },
};

const STEPS = [
  { icon: ClipboardCheck, label: 'Order' },
  { icon: Boxes, label: 'Source' },
  { icon: Snowflake, label: 'Cold storage' },
  { icon: Truck, label: 'Delivery' },
];

const SERVICES = [
  {
    icon: Container,
    title: 'Direct shipping (FCL/LCL)',
    body: 'Full container and less-than-container loads from origin to your dock. Predictable cost-per-kg pricing.',
  },
  {
    icon: Layers,
    title: 'Consolidation',
    body: 'Combine cuts and origins into a single sailing. Lower freight cost, single set of documentation.',
  },
  {
    icon: Warehouse,
    title: 'Cross-dock',
    body: 'Move pallets through our cross-dock facility for re-palletizing, re-labelling, and onward distribution.',
  },
  {
    icon: Anchor,
    title: 'Third-party logistics (3PL)',
    body: 'White-label outbound shipping for distributor partners — your customers, your branding, our infrastructure.',
  },
];

const TIERS = [
  { name: 'Standard', sla: '7+ days', body: 'Best cost-per-kg. Plan your menu around weekly sailings.' },
  { name: 'Expedited', sla: '3-5 days', body: 'Pay a premium for an earlier sailing. Common for last-minute volume needs.' },
  { name: 'Just-in-time', sla: 'Under 3 days', body: 'Air or expedited reefer for urgent gap-fill. Subject to availability.' },
];

export default function LogisticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Logistics"
        title="Cold-chain, consolidation, and lead-times the Caribbean trade can plan around."
        subtitle="From a single pallet through container loads, we move proteins across the Caribbean with the documentation, monitoring, and SLAs B2B buyers expect."
      />

      <section className="container-x py-16">
        <SectionHeading eyebrow="How we ship" title="A four-step process." />
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, idx) => (
            <li
              key={s.label}
              className="flex flex-col items-start gap-3 rounded-lg border border-neutral-200 bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white">
                {idx + 1}
              </div>
              <s.icon className="h-7 w-7 text-brand-primary" aria-hidden />
              <p className="font-serif text-lg text-brand-charcoal">{s.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-cream">
        <div className="container-x py-16">
          <SectionHeading eyebrow="Services" title="The shipping options we offer." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-lg bg-white p-6 shadow-sm">
                <s.icon className="h-7 w-7 text-brand-primary" aria-hidden />
                <h3 className="mt-3 font-serif text-lg text-brand-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-700">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading eyebrow="Lead times" title="Three service tiers." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="rounded-lg border border-neutral-200 p-6">
              <p className="text-sm uppercase tracking-wider text-brand-primary">{t.name}</p>
              <p className="mt-1 font-serif text-2xl text-brand-charcoal">{t.sla}</p>
              <p className="mt-3 text-sm text-neutral-700">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-charcoal text-neutral-200">
        <div className="container-x grid gap-8 py-16 md:grid-cols-[auto_1fr] md:items-start">
          <Snowflake className="h-12 w-12 text-brand-gold" aria-hidden />
          <div>
            <h2 className="font-serif text-h2 text-white">Cold chain commitment</h2>
            <p className="mt-3 max-w-prose text-neutral-300">
              Reefer-container monitoring with IoT temperature loggers, blast-frozen storage at
              origin, and refrigerated last-mile delivery. We will not break the chain — and we
              will give you the temperature record to prove it.
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
