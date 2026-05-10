import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const KG_TO_LB = 2.2046226218;

export function formatWeight(kg: number): string {
  const lb = kg * KG_TO_LB;
  return `${kg.toFixed(2)} kg / ${lb.toFixed(2)} lb`;
}

export function formatPhone(raw: string): string {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  return trimmed;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function kebabCase(input: string): string {
  return slugify(input);
}

export function absoluteUrl(path = '/'): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
