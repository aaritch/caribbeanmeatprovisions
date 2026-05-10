import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  helper,
  error,
  className,
  children,
}: Props) {
  const helperId = helper ? `${htmlFor}-help` : undefined;
  const errorId = error ? `${htmlFor}-err` : undefined;
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-800">
        {label}
        {required ? <span className="ml-0.5 text-brand-primary"> *</span> : null}
      </label>
      {children}
      {helper ? (
        <p id={helperId} className="text-xs text-neutral-500">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
