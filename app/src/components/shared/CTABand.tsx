import { LinkButton } from '@/components/ui/Button';
import { SITE } from '@/components/layout/nav-config';

interface Props {
  headline?: string;
  subhead?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTABand({
  headline = 'Need a quote in 24 hours?',
  subhead = 'Tell us what you need — products, destination port, urgency — and we’ll get back to you within one business day.',
  primaryHref = '/quote',
  primaryLabel = 'Request a Quote',
  secondaryHref = `tel:${SITE.phone}`,
  secondaryLabel = `Call ${SITE.phone}`,
}: Props) {
  return (
    <section className="bg-brand-primary text-white">
      <div className="container-x grid gap-6 py-14 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-serif text-h2 leading-tight">{headline}</h2>
          {subhead ? <p className="mt-2 max-w-prose text-white/90">{subhead}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href={primaryHref} variant="secondary">
            {primaryLabel}
          </LinkButton>
          <LinkButton href={secondaryHref} variant="ghost" className="bg-white/10 text-white hover:bg-white/20">
            {secondaryLabel}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
