import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { CTABand } from '@/components/shared/CTABand';
import { CategoryGridClient } from '@/components/product/CategoryGridClient';
import {
  getAllCategories,
  getCategoryBySlug,
  getCertifications,
  getProductsByCategory,
  getUniqueCutTypes,
  getUniqueOrigins,
  getCertificationSlugsInUse,
} from '@/lib/data';
import type { FilterGroup } from '@/components/product/FilterSidebar';

interface Params {
  params: { category: string };
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCategoryBySlug(params.category);
  if (!c) return {};
  return {
    title: `Wholesale ${c.name} for the Caribbean`,
    description: c.shortDescription,
    alternates: { canonical: `/products/${c.slug}` },
  };
}

const CUT_STYLE_OPTS = ['Bone-in', 'Boneless', 'Whole', 'Portion-cut', 'Ground'];
const TEMP_OPTS = ['Frozen', 'Chilled', 'Fresh'];
const PACK_OPTS = [
  { value: 'vacuum', label: 'Vacuum-packed' },
  { value: 'iqf', label: 'IQF' },
  { value: 'case-pack', label: 'Case-pack' },
  { value: 'cartons', label: 'Cartons' },
  { value: 'chubs', label: 'Chubs' },
];

export default function CategoryPage({ params }: Params) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const cutTypes = getUniqueCutTypes(products);
  const origins = getUniqueOrigins(products);
  const certSlugs = getCertificationSlugsInUse(products);
  const allCerts = getCertifications();
  const certificationLabels: Record<string, string> = Object.fromEntries(
    allCerts.map((c) => [c.slug, c.shortName]),
  );

  const filterGroups: FilterGroup[] = [
    {
      key: 'cut',
      label: 'Cut type',
      options: cutTypes.map((c) => ({ value: c.toLowerCase(), label: c })),
    },
    {
      key: 'style',
      label: 'Cut style',
      options: CUT_STYLE_OPTS.map((s) => ({ value: s.toLowerCase(), label: s })),
    },
    {
      key: 'origin',
      label: 'Origin',
      options: origins.map((o) => ({ value: o.toLowerCase(), label: o })),
    },
    {
      key: 'pack',
      label: 'Packaging',
      options: PACK_OPTS,
    },
    {
      key: 'cert',
      label: 'Certifications',
      options: certSlugs.map((slug) => ({
        value: slug,
        label: certificationLabels[slug] ?? slug,
      })),
    },
    {
      key: 'temp',
      label: 'Frozen / Chilled',
      options: TEMP_OPTS.map((t) => ({ value: t.toLowerCase(), label: t })),
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-brand-charcoal text-white">
        <Image
          src={category.bannerImageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="container-x relative py-16 md:py-24">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: category.name },
            ]}
          />
          <h1 className="mt-4 font-serif text-h1">{category.name}</h1>
          <p className="mt-4 max-w-3xl text-neutral-200 md:text-lg">{category.description}</p>
        </div>
      </section>

      <section className="container-x py-12">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((p) => (
                <div
                  key={`sk-${p.slug}`}
                  className="aspect-[4/5] animate-pulse rounded-lg bg-neutral-200"
                />
              ))}
            </div>
          }
        >
          <CategoryGridClient
            products={products}
            filterGroups={filterGroups}
            certificationLabels={certificationLabels}
          />
        </Suspense>
      </section>

      <CTABand />
    </>
  );
}
