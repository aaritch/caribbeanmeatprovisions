import { SectionHeading } from '@/components/shared/SectionHeading';
import { CategoryTile } from '@/components/product/CategoryTile';
import { getAllCategories, getCategoryProductCount } from '@/lib/data';

export function ProductShowcase() {
  const categories = getAllCategories();
  return (
    <section className="container-x py-16">
      <SectionHeading
        eyebrow="Our range"
        title="Five categories. Every cut."
        kicker="Premium and value programs across beef, pork, poultry, lamb, and mutton — sourced for the way the Caribbean cooks."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {categories.map((c) => (
          <CategoryTile key={c.slug} category={c} productCount={getCategoryProductCount(c.slug)} />
        ))}
      </div>
    </section>
  );
}
