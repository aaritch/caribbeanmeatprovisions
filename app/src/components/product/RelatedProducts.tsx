import { ProductCard } from './ProductCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { Product } from '@/types';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="container-x py-16">
      <SectionHeading eyebrow="Related" title="You may also need" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={`${p.category}-${p.slug}`} product={p} />
        ))}
      </div>
    </section>
  );
}
