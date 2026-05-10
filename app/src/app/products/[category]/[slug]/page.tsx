import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { CTABand } from '@/components/shared/CTABand';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductSpecsTable } from '@/components/product/ProductSpecsTable';
import { CertificationBadge } from '@/components/product/CertificationBadge';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import {
  getAllProducts,
  getCategoryBySlug,
  getCertificationsForProduct,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/data';
import { ChevronLeft, FileDown } from 'lucide-react';

interface Params {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.category, slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProductBySlug(params.category, params.slug);
  if (!product) return {};
  const title = product.metaTitle ?? `${product.name} — ${product.cutType}`;
  const description = product.metaDescription ?? product.shortDescription;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: product.primaryImageUrl }],
    },
    alternates: { canonical: `/products/${params.category}/${params.slug}` },
  };
}

export default function ProductDetailPage({ params }: Params) {
  const category = getCategoryBySlug(params.category);
  const product = getProductBySlug(params.category, params.slug);
  if (!category || !product) notFound();

  const certs = getCertificationsForProduct(product);
  const related = getRelatedProducts(product, 3);

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: [product.primaryImageUrl],
    category: category.name,
    brand: { '@type': 'Brand', name: 'Caribbean Meat Provisions' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Origin', value: product.origin },
      { '@type': 'PropertyValue', name: 'Packaging', value: product.packaging },
      { '@type': 'PropertyValue', name: 'Cut Style', value: product.cutStyle },
    ],
  };

  return (
    <>
      <section className="container-x pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: category.name, href: `/products/${category.slug}` },
            { label: product.name },
          ]}
        />
      </section>

      <section className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <ImageGallery images={product.galleryImageUrls} productName={product.name} />

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{product.origin}</Badge>
              <Badge variant="neutral">{product.packaging}</Badge>
              <Badge variant="primary">{product.frozenOrChilled}</Badge>
              {certs.map((c) => (
                <CertificationBadge key={c.slug} certification={c} size="sm" />
              ))}
            </div>

            <h1 className="font-serif text-h1 leading-tight text-brand-charcoal">{product.name}</h1>
            <p className="text-lg text-neutral-700">{product.shortDescription}</p>

            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <ProductSpecsTable product={product} />
            </div>

            <div className="space-y-3 text-neutral-700">
              {product.longDescription.split(/\n+/).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              {product.suggestedUses ? (
                <p>
                  <strong>Suggested uses:</strong> {product.suggestedUses}
                </p>
              ) : null}
            </div>

            {certs.length > 0 ? (
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-500">Certifications</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {certs.map((c) => (
                    <CertificationBadge key={c.slug} certification={c} size="md" />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton href={`/quote?product=${product.category}-${product.slug}`}>
                Request a Quote
              </LinkButton>
              {product.specSheetPdfUrl ? (
                <a
                  href={product.specSheetPdfUrl}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 font-semibold text-brand-charcoal hover:border-brand-charcoal"
                >
                  <FileDown className="h-4 w-4" aria-hidden /> Download spec sheet
                </a>
              ) : null}
              <Link
                href={`/products/${category.slug}`}
                className="inline-flex h-11 items-center gap-1 px-2 text-sm font-semibold text-brand-primary hover:underline"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden /> Back to {category.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />

      <CTABand
        headline="Need a custom cut?"
        subhead="If we don’t carry the exact spec, we usually know who does. Tell us what you need."
        primaryLabel="Request custom quote"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
