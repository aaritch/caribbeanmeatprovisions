import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, invalid, rows = 5, ...rest }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-md border bg-white px-3 py-2 text-base text-brand-charcoal placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        invalid ? 'border-red-500' : 'border-neutral-300',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  ),
);
Textarea.displayName = 'Textarea';
