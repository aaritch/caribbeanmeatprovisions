'use client';

import { useSearchParams } from 'next/navigation';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/lib/resources';

export function FilteredArticleGrid({ articles }: { articles: Article[] }) {
  const params = useSearchParams();
  const active = params.get('category');
  const filtered = active ? articles.filter((a) => a.category === active) : articles;

  if (!filtered.length) {
    return (
      <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
        <p className="font-serif text-xl text-brand-charcoal">No articles in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  );
}
