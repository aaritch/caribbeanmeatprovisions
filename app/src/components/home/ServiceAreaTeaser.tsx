import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { MapIllustration } from '@/components/shared/MapIllustration';
import { getServiceAreas } from '@/lib/data';

export function ServiceAreaTeaser() {
  const countries = getServiceAreas().slice(0, 12);
  return (
    <section className="bg-brand-charcoal text-neutral-200">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <MapIllustration />
        </div>
        <div>
          <SectionHeading
            eyebrow="Service area"
            title="20+ Caribbean countries."
            kicker="Weekly and bi-weekly sailings into the ports your business uses. Standard, expedited, and just-in-time tiers."
            className="text-white [&_p]:text-neutral-300 [&_h2]:text-white"
          />
          <ul className="mt-6 grid grid-cols-2 gap-y-2 text-sm text-neutral-300 md:grid-cols-3">
            {countries.map((c) => (
              <li key={c.country}>{c.country}</li>
            ))}
          </ul>
          <Link
            href="/service-area"
            className="mt-8 inline-flex items-center gap-1 font-semibold text-brand-gold hover:underline"
          >
            View full coverage
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
