import { X } from 'lucide-react';

export function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-800 hover:border-brand-primary hover:text-brand-primary"
    >
      {label}
      <X className="h-3 w-3" aria-hidden />
      <span className="sr-only">Remove filter</span>
    </button>
  );
}
