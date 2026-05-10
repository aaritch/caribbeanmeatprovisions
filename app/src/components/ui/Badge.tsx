import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'neutral' | 'primary' | 'gold' | 'green' | 'outline';
type Size = 'sm' | 'md';

const variantClasses: Record<Variant, string> = {
  neutral: 'bg-neutral-100 text-neutral-800',
  primary: 'bg-brand-primary text-white',
  gold: 'bg-brand-gold/15 text-brand-gold',
  green: 'bg-brand-green/15 text-brand-green',
  outline: 'border border-neutral-300 bg-white text-neutral-800',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export interface BadgeProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', size = 'sm', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
