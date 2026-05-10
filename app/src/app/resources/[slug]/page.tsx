import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { CTABand } from '@/components/shared/CTABand';
import { ArticleCard } from '@/components/resources/ArticleCard';
import {
  getAllArticles,
  getArticleBySlug,
  renderArticleBody,
} from '@/lib/resources';
import { Badge } from '@/components/ui/Badge';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: [{ url: article.imageUrl }],
      publishedTime: article.date || undefined,
    },
    alternates: { canonical: `/resources/${article.slug}` },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function ArticlePage({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const html = renderArticleBody(article.body);
  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [`${SITE_URL}${article.imageUrl}`],
    datePublished: article.date,
    author: { '@type': 'Organization', name: article.author ?? 'Caribbean Meat Provisions' },
    publisher: {
      '@type': 'Organization',
      name: 'Caribbean Meat Provisions',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
    },
  };

  return (
    <>
      <section className="container-x pt-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: article.title },
          ]}
        />
      </section>

      <article className="container-x py-10">
        <div className="mb-6 flex items-center gap-3">
          <Badge variant="gold" size="md">{article.category}</Badge>
          {article.date ? (
            <time className="text-sm text-neutral-500" dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          ) : null}
        </div>
        <h1 className="font-serif text-h1 leading-tight text-brand-charcoal">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-700">{article.excerpt}</p>
        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
            className="object-cover"
          />
        </div>
        <div
          className="prose prose-neutral mt-10 max-w-3xl [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-xl [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-gold [&_blockquote]:bg-brand-cream [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {related.length ? (
        <section className="container-x py-12">
          <h2 className="font-serif text-h3 text-brand-charcoal">Related articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}

      <CTABand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
