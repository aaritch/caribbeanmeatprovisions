import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Certification } from '@/types';

interface Props {
  certification: Certification;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
} as const;

export function CertificationBadge({ certification, size = 'md', className }: Props) {
  return (
    <span
      title={certification.name}
      aria-label={certification.name}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 font-semibold text-brand-charcoal',
        sizeMap[size],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden />
      {certification.shortName}
    </span>
  );
}

export function CertificationPill({ slug, label }: { slug: string; label: string }) {
  return (
    <Badge variant="gold" size="sm" className="uppercase tracking-wider">
      {label || slug}
    </Badge>
  );
}
