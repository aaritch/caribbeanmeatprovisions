import Link from 'next/link';
import { Building2, GraduationCap, Ship, ShoppingCart, UtensilsCrossed, Warehouse } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getCustomerTypes } from '@/lib/data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  UtensilsCrossed,
  Warehouse,
  ShoppingCart,
  Ship,
  GraduationCap,
};

export function CustomerTypesBand() {
  const types = getCustomerTypes();
  return (
    <section className="container-x py-16">
      <SectionHeading eyebrow="Who we serve" title="Six customer profiles." align="center" />
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {types.map((t) => {
          const Icon = ICONS[t.iconName] ?? Warehouse;
          return (
            <li key={t.slug}>
              <Link
                href="/customers"
                className="flex h-full flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon className="h-8 w-8 text-brand-primary" aria-hidden />
                <p className="font-semibold text-brand-charcoal">{t.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
