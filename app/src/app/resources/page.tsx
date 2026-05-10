import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CTABand } from '@/components/shared/CTABand';
import { CategoryFilter } from '@/components/resources/CategoryFilter';
import { FilteredArticleGrid } from '@/components/resources/FilteredArticleGrid';
import { getAllArticles, getAllArticleCategories } from '@/lib/resources';

export const metadata: Metadata = {
  title: 'Resources & Insights',
  description:
    'News, specials, and industry insights on Caribbean B2B meat distribution from Caribbean Meat Provisions.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  const articles = getAllArticles();
  const categories = getAllArticleCategories();
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="News, insights, and specials."
        subtitle="Industry trends and current programs from the Caribbean meat trade."
      />
      <section className="container-x py-12">
        {categories.length > 1 ? (
          <Suspense fallback={null}>
            <div className="mb-8">
              <CategoryFilter categories={categories} />
            </div>
          </Suspense>
        ) : null}
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 6).map((a) => (
                <div key={a.slug} className="aspect-[16/12] animate-pulse rounded-lg bg-neutral-200" />
              ))}
            </div>
          }
        >
          <FilteredArticleGrid articles={articles} />
        </Suspense>
      </section>
      <CTABand />
    </>
  );
}
