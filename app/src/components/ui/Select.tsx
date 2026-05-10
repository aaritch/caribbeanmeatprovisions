import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ className, invalid, children, ...rest }, ref) => (
    <select
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border bg-white px-3 text-base text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        invalid ? 'border-red-500' : 'border-neutral-300',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </select>
  ),
);
Select.displayName = 'Select';
