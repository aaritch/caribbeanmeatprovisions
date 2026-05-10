import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
