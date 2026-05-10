'use client';

import { Checkbox } from '@/components/ui/Checkbox';

export interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface FilterState {
  [key: string]: string[];
}

interface Props {
  groups: FilterGroup[];
  state: FilterState;
  onChange: (key: string, value: string, checked: boolean) => void;
  onClearAll: () => void;
}

export function FilterSidebar({ groups, state, onChange, onClearAll }: Props) {
  const totalActive = Object.values(state).reduce((acc, v) => acc + v.length, 0);
  return (
    <aside className="space-y-6 text-sm" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <p className="font-serif text-lg text-brand-charcoal">Filters</p>
        {totalActive > 0 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-brand-primary hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>
      {groups.map((g) => (
        <fieldset key={g.key} className="border-t border-neutral-200 pt-4">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-700">
            {g.label}
          </legend>
          <ul className="space-y-1.5">
            {g.options.map((opt) => {
              const id = `f-${g.key}-${opt.value}`;
              const checked = (state[g.key] ?? []).includes(opt.value);
              return (
                <li key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(g.key, opt.value, e.currentTarget.checked)}
                  />
                  <label htmlFor={id} className="cursor-pointer text-neutral-800">
                    {opt.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </aside>
  );
}
