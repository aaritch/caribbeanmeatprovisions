'use client';

import { Button } from '@/components/ui/Button';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-x py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">500</p>
      <h1 className="mt-2 font-serif text-h1 text-brand-charcoal">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-prose text-neutral-600">
        Our team has been notified. Try again in a moment, or get in touch.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <a
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 font-semibold text-brand-charcoal hover:border-brand-charcoal"
        >
          Contact us
        </a>
      </div>
    </section>
  );
}
