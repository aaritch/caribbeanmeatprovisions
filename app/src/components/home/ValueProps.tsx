import { Clock, MapPin, Snowflake } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

const VALUES = [
  {
    icon: Clock,
    title: 'Short Lead-Time',
    body: 'Just-in-time supply for gap-fill orders, expedited sailings, and urgent menu requirements. We move on your schedule, not ours.',
  },
  {
    icon: MapPin,
    title: 'Caribbean Coverage',
    body: '20+ countries served across the Greater Antilles, Lesser Antilles, Bahamas, and beyond. Weekly and bi-weekly sailings.',
  },
  {
    icon: Snowflake,
    title: 'Cold-Chain Integrity',
    body: 'Blast-frozen at origin, IoT-monitored reefer containers in transit, refrigerated last-mile to your dock. The chain stays intact.',
  },
];

export function ValueProps() {
  return (
    <section className="bg-brand-cream">
      <div className="container-x py-16">
        <SectionHeading
          eyebrow="Why CMP"
          title="The reasons buyers stay with us."
          align="center"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-lg bg-white p-8 shadow-sm">
              <v.icon className="h-10 w-10 text-brand-primary" aria-hidden />
              <h3 className="mt-5 font-serif text-2xl text-brand-charcoal">{v.title}</h3>
              <p className="mt-3 text-neutral-700">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
