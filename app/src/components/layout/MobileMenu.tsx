'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV, PRODUCT_LINKS, SECONDARY_NAV } from './nav-config';
import { cn } from '@/lib/utils';

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-80 max-w-[90vw] flex-col bg-white shadow-2xl transition-transform',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
            <span className="font-serif font-bold">Menu</span>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
            <p className="mb-2 mt-1 text-xs uppercase tracking-wider text-neutral-500">Products</p>
            <ul className="mb-4 space-y-1">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 mt-1 text-xs uppercase tracking-wider text-neutral-500">Company</p>
            <ul className="mb-4 space-y-1">
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-neutral-200 p-4">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand-primary px-5 font-semibold text-white hover:bg-brand-primary-dark"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
