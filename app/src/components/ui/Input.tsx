import * as React from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border bg-white px-3 text-base text-brand-charcoal placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        invalid ? 'border-red-500' : 'border-neutral-300',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  ),
);
Input.displayName = 'Input';
