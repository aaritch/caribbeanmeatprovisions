'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { FilterSidebar, type FilterGroup, type FilterState } from './FilterSidebar';
import { FilterChip } from './FilterChip';
import { Pagination } from '@/components/shared/Pagination';
import { LinkButton } from '@/components/ui/Button';
import { Filter, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface Props {
  products: Product[];
  filterGroups: FilterGroup[];
  certificationLabels: Record<string, string>;
}

const PAGE_SIZE = 12;

const FILTER_KEYS = ['cut', 'style', 'origin', 'pack', 'cert', 'temp'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'recent', label: 'Recently Added' },
  { value: 'origin', label: 'Origin' },
];

function parseList(v: string | null): string[] {
  return v ? v.split(',').filter(Boolean) : [];
}

export function CategoryGridClient({ products, filterGroups, certificationLabels }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const filterState: FilterState = React.useMemo(() => {
    const out: FilterState = {};
    for (const k of FILTER_KEYS) out[k] = parseList(searchParams.get(k));
    return out;
  }, [searchParams]);

  const search = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'featured';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);

  const updateParams = React.useCallback(
    (updates: Record<string, string | null>, opts: { resetPage?: boolean } = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === '') params.delete(k);
        else params.set(k, v);
      }
      if (opts.resetPage) params.delete('page');
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    const current = filterState[key] ?? [];
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    updateParams({ [key]: next.length ? next.join(',') : null }, { resetPage: true });
  };

  const handleClearAll = () => {
    const updates: Record<string, string | null> = { q: null, sort: null, page: null };
    for (const k of FILTER_KEYS) updates[k] = null;
    updateParams(updates);
  };

  const handleRemoveChip = (key: FilterKey, value: string) => {
    const next = (filterState[key] ?? []).filter((v) => v !== value);
    updateParams({ [key]: next.length ? next.join(',') : null }, { resetPage: true });
  };

  // Filter products
  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.cutType} ${p.shortDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const cuts = filterState.cut;
      if (cuts.length && !cuts.includes(p.cutType.toLowerCase())) return false;
      const styles = filterState.style;
      if (styles.length && !styles.includes(p.cutStyle.toLowerCase())) return false;
      const origins = filterState.origin;
      if (origins.length && !origins.includes(p.origin.toLowerCase())) return false;
      const packs = filterState.pack;
      if (packs.length && !packs.some((pk) => p.packaging.toLowerCase().includes(pk))) return false;
      const certs = filterState.cert;
      if (certs.length && !certs.every((c) => p.certifications.includes(c))) return false;
      const temps = filterState.temp;
      if (temps.length && !temps.includes(p.frozenOrChilled.toLowerCase())) return false;
      return true;
    });
  }, [products, search, filterState]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'name-asc':
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        arr.sort((a, b) => b.displayOrder - a.displayOrder);
        break;
      case 'origin':
        arr.sort((a, b) => a.origin.localeCompare(b.origin));
        break;
      case 'featured':
      default:
        arr.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.displayOrder - b.displayOrder);
    }
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageProducts = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const groupOptionLabel = (key: string, value: string) => {
    const grp = filterGroups.find((g) => g.key === key);
    return grp?.options.find((o) => o.value === value)?.label ?? value;
  };

  const certLabel = (slug: string) => certificationLabels[slug] ?? slug;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <FilterSidebar
          groups={filterGroups}
          state={filterState}
          onChange={handleFilterChange}
          onClearAll={handleClearAll}
        />
      </div>

      <div>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => updateParams({ q: e.currentTarget.value || null }, { resetPage: true })}
              placeholder="Search by name or cut…"
              className="h-10 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              aria-label="Search products"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-800 hover:border-brand-primary hover:text-brand-primary lg:hidden"
            >
              <Filter className="h-4 w-4" aria-hidden /> Filters
            </button>
            <label className="text-xs uppercase tracking-wider text-neutral-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.currentTarget.value === 'featured' ? null : e.currentTarget.value })}
              className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active chips */}
        {Object.values(filterState).some((arr) => arr.length > 0) || search ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {search ? (
              <FilterChip label={`Search: ${search}`} onRemove={() => updateParams({ q: null }, { resetPage: true })} />
            ) : null}
            {(FILTER_KEYS as readonly FilterKey[]).flatMap((k) =>
              (filterState[k] ?? []).map((v) => (
                <FilterChip
                  key={`${k}-${v}`}
                  label={k === 'cert' ? certLabel(v) : groupOptionLabel(k, v)}
                  onRemove={() => handleRemoveChip(k, v)}
                />
              )),
            )}
          </div>
        ) : null}

        <p className="mb-4 text-sm text-neutral-600">
          Showing <strong>{pageProducts.length}</strong> of <strong>{sorted.length}</strong> products
        </p>

        {sorted.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
            <p className="font-serif text-xl text-brand-charcoal">No products match those filters.</p>
            <p className="mt-2 text-sm text-neutral-700">
              Clear the filters or request a custom quote — we may be able to source it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 text-sm font-medium hover:border-brand-primary hover:text-brand-primary"
              >
                Clear filters
              </button>
              <LinkButton href="/quote" variant="primary" size="sm">
                Request a custom quote
              </LinkButton>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pageProducts.map((p) => (
                <ProductCard key={`${p.category}-${p.slug}`} product={p} />
              ))}
            </div>
            <div className="mt-10">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(n) => updateParams({ page: n === 1 ? null : String(n) })}
              />
            </div>
          </>
        )}
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          aria-hidden
          onClick={() => setDrawerOpen(false)}
          className={cn('absolute inset-0 bg-black/50 transition-opacity', drawerOpen ? 'opacity-100' : 'opacity-0')}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-80 max-w-[90vw] flex-col bg-white shadow-2xl transition-transform',
            drawerOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
            <p className="font-serif text-lg">Filters</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <FilterSidebar
              groups={filterGroups}
              state={filterState}
              onChange={handleFilterChange}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
