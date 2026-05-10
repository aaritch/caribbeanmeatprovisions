import type { Metadata } from 'next';
import { SITE } from '@/components/layout/nav-config';
import type { Article } from './resources';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumb';
import type { Product } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

interface BuildMetadataOpts {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.png',
  type = 'website',
  noindex,
}: BuildMetadataOpts): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
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
  };
}

export function buildLocalBusinessJsonLd() {
  return {
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
}

export function buildProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: [`${SITE_URL}${product.primaryImageUrl}`],
    category: product.category,
    brand: { '@type': 'Brand', name: SITE.name },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Origin', value: product.origin },
      { '@type': 'PropertyValue', name: 'Packaging', value: product.packaging },
      { '@type': 'PropertyValue', name: 'Cut Style', value: product.cutStyle },
      { '@type': 'PropertyValue', name: 'Storage', value: product.storageTempC ?? '-18°C' },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href ? new URL(item.href, SITE_URL).toString() : undefined,
    })),
  };
}

export function buildArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [`${SITE_URL}${article.imageUrl}`],
    datePublished: article.date,
    author: { '@type': 'Organization', name: article.author ?? SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
    },
  };
}
