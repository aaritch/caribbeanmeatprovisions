import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTABand } from '@/components/shared/CTABand';
import { getTeamMembers } from '@/lib/data';
import { Award, ShieldCheck, Handshake, Snowflake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Caribbean Meat Provisions is a B2B importer and distributor of beef, pork, poultry, lamb, and mutton — built around short lead-times and certified cold-chain logistics across the Caribbean.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  {
    icon: Award,
    title: 'Quality',
    body: 'We source from USDA, EU, and Halal-certified programs only. Every shipment ships with the documentation buyers and regulators expect.',
  },
  {
    icon: Snowflake,
    title: 'Cold-chain Integrity',
    body: 'Blast-frozen, temperature-tracked reefer containers, and last-mile cold delivery. Cold chain is our non-negotiable.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliability',
    body: 'Short lead-times and consistent fill rates. We plan for the consolidation, customs, and port-call exceptions before they happen.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    body: 'We grow with our customers. From single-property hotels to multi-island distributors, we tailor case sizes, packaging, and frequency to your operation.',
  },
];

export default function AboutPage() {
  const team = getTeamMembers();
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A Caribbean meat partner built around short lead-times."
        subtitle="Caribbean Meat Provisions LLC is a B2B importer and distributor of beef, pork, poultry, lamb, and mutton serving foodservice and retail buyers across the Caribbean. Our differentiator is just-in-time supply backed by a certified cold chain."
      />

      <section className="container-x py-16">
        <SectionHeading eyebrow="Our story" title="Built for the Caribbean trade." />
        <div className="mt-6 grid gap-6 text-neutral-700 md:grid-cols-2">
          <p>
            We began as a Miami-based consolidator working with hotel and resort buyers across
            the Greater Antilles. The brief was simple: source the cuts the property needed,
            move them through the cold chain without compromise, and put them on the dock the
            day the chef expected them. That brief still defines us.
          </p>
          <p>
            Today we operate across 20+ Caribbean countries with weekly and bi-weekly sailings,
            consolidation and cross-dock services, and a documentation pack that satisfies the
            most cautious procurement and compliance teams.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="container-x py-16">
          <SectionHeading eyebrow="Our values" title="What we won’t compromise on." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-lg bg-white p-6 shadow-sm">
                <v.icon className="h-8 w-8 text-brand-primary" aria-hidden />
                <h3 className="mt-4 font-serif text-xl text-brand-charcoal">{v.title}</h3>
                <p className="mt-2 text-sm text-neutral-700">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {team.length > 0 ? (
        <section className="container-x py-16">
          <SectionHeading eyebrow="Our team" title="Leadership" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-lg border border-neutral-200 p-6">
                <p className="font-serif text-xl text-brand-charcoal">{m.name}</p>
                <p className="text-sm uppercase tracking-wider text-brand-primary">{m.role}</p>
                {m.bio ? <p className="mt-3 text-sm text-neutral-700">{m.bio}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}
