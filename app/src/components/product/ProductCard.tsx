import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CertificationBadge } from './CertificationBadge';
import { getCertificationsForProduct } from '@/lib/data';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  const certs = getCertificationsForProduct(product).slice(0, 3);
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.primaryImageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wider text-brand-primary">{product.cutType}</p>
        <h3 className="font-serif text-lg leading-tight text-brand-charcoal">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-neutral-600">{product.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="outline" size="sm">
            {product.origin}
          </Badge>
          <Badge variant="neutral" size="sm">
            {product.frozenOrChilled}
          </Badge>
          {certs.map((c) => (
            <CertificationBadge key={c.slug} certification={c} size="sm" />
          ))}
        </div>
      </div>
    </Link>
  );
}
