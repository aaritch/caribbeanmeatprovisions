import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABand } from '@/components/shared/CTABand';
import { MapIllustration } from '@/components/shared/MapIllustration';
import { LinkButton } from '@/components/ui/Button';
import { getServiceAreasByRegion } from '@/lib/data';
import type { Region } from '@/types';

export const metadata: Metadata = {
  title: 'Caribbean Service Area & Lead Times',
  description:
    'Ports, lead times, and shipping frequencies across the Greater Antilles, Lesser Antilles, Bahamas, Cayman Islands, and beyond. 20+ countries served.',
  alternates: { canonical: '/service-area' },
};

const HOW_SHIPPING_WORKS = [
  {
    step: 1,
    title: 'Order',
    body: 'Confirm cuts, case sizes, and certification requirements. Lock in your destination port and required-by date.',
  },
  {
    step: 2,
    title: 'Consolidation',
    body: 'We consolidate from the appropriate origin program, prepare documentation, and stage for the next sailing.',
  },
  {
    step: 3,
    title: 'Delivery',
    body: 'Reefer container moves to the destination port with full temperature traceability and complete documentation.',
  },
];

export default function ServiceAreaPage() {
  const grouped = getServiceAreasByRegion();
  const regions = Object.keys(grouped) as Region[];
  return (
    <>
      <PageHeader
        eyebrow="Service area"
        title="20+ Caribbean countries. Weekly and bi-weekly sailings."
        subtitle="Find your country, your port, and your typical lead time. Need a market we don’t list? Talk to us — we ship to more places than we publish."
      />

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <MapIllustration />
            <p className="mt-3 text-xs text-neutral-500">
              Illustration only. Lead times subject to sailing schedules and customs clearance.
            </p>
          </div>
          <div className="space-y-10">
            {regions.map((region) => {
              const areas = grouped[region];
              if (!areas.length) return null;
              return (
                <section key={region}>
                  <h2 className="font-serif text-h3 text-brand-charcoal">{region}</h2>
                  <ul className="mt-4 divide-y divide-neutral-200 rounded-lg border border-neutral-200">
                    {areas.map((area) => (
                      <li key={area.country} className="grid gap-2 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                        <div>
                          <p className="font-semibold text-brand-charcoal">{area.country}</p>
                          <p className="text-sm text-neutral-600">{area.ports.join(' · ')}</p>
                        </div>
                        <p className="text-sm text-neutral-700">
                          <span className="font-semibold">{area.typicalLeadTimeDays}</span> days
                        </p>
                        <p className="text-sm text-neutral-500">
                          {area.shippingFrequency ?? 'On request'}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="container-x py-16">
          <SectionHeading eyebrow="How shipping works" title="Three steps from order to dock." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {HOW_SHIPPING_WORKS.map((s) => (
              <div key={s.step} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-brand-primary">Step {s.step}</p>
                <h3 className="mt-2 font-serif text-xl text-brand-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-700">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg border-2 border-dashed border-brand-primary/40 bg-white p-6 text-center">
            <p className="font-serif text-xl text-brand-charcoal">Don’t see your country?</p>
            <p className="mt-2 text-sm text-neutral-700">
              We service more markets than we publicly list. Get in touch — we’ll tell you what
              it takes to reach your dock.
            </p>
            <div className="mt-4">
              <LinkButton href="/contact" variant="primary">
                Contact us
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
