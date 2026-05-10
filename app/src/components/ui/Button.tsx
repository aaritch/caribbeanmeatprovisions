import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary-dark',
  secondary:
    'bg-white text-brand-charcoal border border-neutral-300 hover:border-brand-charcoal',
  ghost: 'bg-transparent text-brand-charcoal hover:bg-neutral-100',
  link: 'bg-transparent text-brand-primary underline-offset-4 hover:underline px-0',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-7 text-lg',
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  prefetch,
  target,
  rel,
  ariaLabel,
}: LinkButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  if (target) {
    return (
      <a href={href} className={classes} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} prefetch={prefetch} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
