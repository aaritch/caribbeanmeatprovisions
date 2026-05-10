import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/data';

export function FeaturedProducts() {
  const featured = getFeaturedProducts(8);
  if (!featured.length) return null;
  return (
    <section className="bg-brand-cream">
      <div className="container-x py-16">
        <SectionHeading eyebrow="Featured" title="Cuts buyers come back for." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={`${p.category}-${p.slug}`} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
