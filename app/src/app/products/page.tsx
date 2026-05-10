import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { CTABand } from '@/components/shared/CTABand';
import { CategoryTile } from '@/components/product/CategoryTile';
import { getAllCategories, getCategoryProductCount } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Product Range',
  description:
    'Beef, pork, poultry, lamb, and mutton — sourced for the Caribbean B2B foodservice and retail trade. Browse the full range.',
  alternates: { canonical: '/products' },
};

export default function ProductsLanding() {
  const categories = getAllCategories();
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Our product range."
        subtitle="Five protein categories, sourced from leading USDA, EU, Australian, and New Zealand programs. Halal-certified options across every category."
      />

      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((c) => (
            <CategoryTile
              key={c.slug}
              category={c}
              productCount={getCategoryProductCount(c.slug)}
            />
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-brand-green/30 bg-brand-green/5 p-6 text-center">
          <p className="font-serif text-xl text-brand-charcoal">
            Halal-certified products available across every category.
          </p>
          <p className="mt-2 text-sm text-neutral-700">
            Filter for Halal certification on any category page, or tell us your requirements
            on the quote form.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
