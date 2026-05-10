import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

export function CategoryTile({
  category,
  productCount,
}: {
  category: Category;
  productCount?: number;
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative block overflow-hidden rounded-lg bg-brand-charcoal text-white shadow-md transition-shadow hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={category.tileImageUrl}
          alt={category.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs uppercase tracking-wider text-brand-gold">
            {productCount ? `${productCount} cuts available` : 'Browse cuts'}
          </p>
          <h3 className="mt-1 font-serif text-h3 leading-tight">{category.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/85">{category.shortDescription}</p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold transition-transform group-hover:translate-x-1">
            View {category.name}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </p>
        </div>
      </div>
    </Link>
  );
}
