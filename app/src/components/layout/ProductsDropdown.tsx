'use client';

import * as React from 'react';
import Link from 'next/link';
import { PRODUCT_LINKS } from './nav-config';
import { cn } from '@/lib/utils';

const CLOSE_DELAY_MS = 150;

export function ProductsDropdown() {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  React.useEffect(() => () => cancelClose(), [cancelClose]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(e) => {
        // close when focus leaves the entire container
        if (!containerRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <Link
        href="/products"
        aria-haspopup="menu"
        aria-expanded={open}
        className="text-sm font-medium text-neutral-700 hover:text-brand-primary"
      >
        Products
      </Link>
      <div
        role="menu"
        aria-label="Products"
        className={cn(
          'absolute left-0 top-full z-30 w-56 pt-2',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <ul className="rounded-md border border-neutral-200 bg-white p-2 shadow-xl">
          {PRODUCT_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className="block rounded px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100 hover:text-brand-primary focus-visible:bg-neutral-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
