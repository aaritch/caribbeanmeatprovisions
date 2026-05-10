'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function CategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get('category') ?? 'all';

  const setActive = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === 'all') next.delete('category');
    else next.set('category', value);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const opts = [{ value: 'all', label: 'All' }, ...categories.map((c) => ({ value: c, label: c }))];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      {opts.map((o) => {
        const isActive = active === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(o.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-brand-primary bg-brand-primary text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-primary hover:text-brand-primary',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
