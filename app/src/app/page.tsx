import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { ValueProps } from '@/components/home/ValueProps';
import { CustomerTypesBand } from '@/components/home/CustomerTypesBand';
import { ServiceAreaTeaser } from '@/components/home/ServiceAreaTeaser';
import { CertificationsBand } from '@/components/home/CertificationsBand';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CTABand } from '@/components/shared/CTABand';
import { SITE } from '@/components/layout/nav-config';

export const metadata: Metadata = {
  title: `${SITE.name} | Wholesale Beef, Pork, Poultry, Lamb & Mutton`,
  description:
    'Caribbean B2B importer and distributor of premium beef, pork, poultry, lamb, and mutton. Short lead-times, certified cold-chain, and 20+ countries served.',
  alternates: { canonical: '/' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2400 NW 17th Ave',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33142',
    addressCountry: 'US',
  },
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductShowcase />
      <ValueProps />
      <CustomerTypesBand />
      <ServiceAreaTeaser />
      <CertificationsBand />
      <FeaturedProducts />
      <CTABand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </>
  );
}
