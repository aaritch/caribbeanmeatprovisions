import Link from 'next/link';
import { LinkButton } from '@/components/ui/Button';
import { PRIMARY_NAV, SECONDARY_NAV, SITE } from './nav-config';
import { ProductsDropdown } from './ProductsDropdown';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold text-brand-charcoal">
          <span className="inline-block h-7 w-7 rounded-sm bg-brand-primary" aria-hidden />
          <span className="hidden sm:inline">{SITE.name}</span>
          <span className="sm:hidden">{SITE.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <ProductsDropdown />
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-neutral-200" aria-hidden />
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton href="/quote" variant="primary" size="sm" className="hidden sm:inline-flex">
            Request a Quote
          </LinkButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
