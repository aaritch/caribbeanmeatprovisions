import Image from 'next/image';
import { LinkButton } from '@/components/ui/Button';
import { SITE } from '@/components/layout/nav-config';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal text-white">
      <Image
        src="/images/hero/hero-collage.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="container-x relative grid min-h-[85vh] items-center py-16 md:min-h-screen">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Caribbean B2B importer & distributor
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-6xl lg:text-7xl">
            {SITE.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-200 md:text-xl">
            Caribbean coverage. Short lead-times. Just-in-time supply backed by certified
            cold-chain — built for hotels, restaurants, distributors, supermarkets, cruise lines,
            and institutional buyers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/quote" size="lg">
              Request a Quote
            </LinkButton>
            <LinkButton href="/products" variant="ghost" size="lg" className="bg-white/10 text-white hover:bg-white/20">
              Browse Products
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
