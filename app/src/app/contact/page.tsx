import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE } from '@/components/layout/nav-config';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Caribbean Meat Provisions — phone, email, address, and contact form.',
  alternates: { canonical: '/contact' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: SITE_URL,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2400 NW 17th Ave',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33142',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to our sales team."
        subtitle="Phone, email, or send a message. Quote requests should go through the quote form for the fastest response."
      />
      <section className="container-x py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <ContactInfo icon={Phone} label="Phone" value={SITE.phone} href={`tel:${SITE.phone}`} />
            <ContactInfo icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactInfo icon={MapPin} label="Address" value={SITE.address} />
            <ContactInfo icon={Clock} label="Business hours" value="Mon–Fri, 08:00–18:00 EST" />
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-h3 text-brand-charcoal">Send a message</h2>
            <p className="mt-2 text-sm text-neutral-600">
              For quotes, please use the{' '}
              <a className="text-brand-primary hover:underline" href="/quote">quote form</a>.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-5 w-5 text-brand-primary" aria-hidden />
      <div>
        <p className="text-xs uppercase tracking-wider text-neutral-500">{label}</p>
        {href ? (
          <a href={href} className="font-serif text-xl text-brand-charcoal hover:text-brand-primary">
            {value}
          </a>
        ) : (
          <p className="font-serif text-xl text-brand-charcoal">{value}</p>
        )}
      </div>
    </div>
  );
}
