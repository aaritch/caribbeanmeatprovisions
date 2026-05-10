import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function NewsletterBand() {
  return (
    <div className="border-t border-neutral-800 bg-brand-charcoal">
      <div className="container-x grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="text-cream">
          <p className="font-serif text-2xl text-white">Subscribe to our newsletter</p>
          <p className="mt-1 text-sm text-neutral-400">
            Specials, industry insights, and Caribbean trade updates.
          </p>
        </div>
        <div className="md:justify-self-end">
          <NewsletterForm variant="dark" />
        </div>
      </div>
    </div>
  );
}
