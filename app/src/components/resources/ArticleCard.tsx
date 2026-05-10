import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { Article } from '@/lib/resources';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-neutral-100">
        <Image
          src={article.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm">{article.category}</Badge>
          {article.date ? (
            <time className="text-xs text-neutral-500" dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          ) : null}
        </div>
        <h3 className="font-serif text-xl leading-tight text-brand-charcoal">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm text-neutral-600">{article.excerpt}</p>
        <p className="mt-auto pt-2 text-sm font-semibold text-brand-primary">Read more →</p>
      </div>
    </Link>
  );
}
