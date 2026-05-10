import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  kicker,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: string;
  kicker?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 font-serif text-h2 text-brand-charcoal">{title}</h2>
      {kicker ? (
        <p className={cn('mt-3 max-w-prose text-neutral-600', align === 'center' && 'mx-auto')}>
          {kicker}
        </p>
      ) : null}
    </div>
  );
}
