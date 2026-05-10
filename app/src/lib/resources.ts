import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderMarkdown } from './markdown';

const DIR = join(process.cwd(), 'src', 'content', 'resources');

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author?: string;
  body: string; // raw markdown
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const k = line.slice(0, idx).trim();
    let v = line.slice(idx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    data[k] = v;
  }
  return { data, body: m[2] };
}

function articleFromFile(filename: string): Article {
  const raw = readFileSync(join(DIR, filename), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const slug = filename.replace(/\.mdx?$/, '');
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'Insights',
    date: data.date ?? '',
    imageUrl: data.image ?? '/images/hero/hero-collage.svg',
    author: data.author,
    body,
  };
}

export function getAllArticles(): Article[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }
  return files
    .map(articleFromFile)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

export function getArticleBySlug(slug: string): Article | null {
  const all = getAllArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export function getAllArticleCategories(): string[] {
  const set = new Set<string>();
  for (const a of getAllArticles()) set.add(a.category);
  return Array.from(set).sort();
}

export function renderArticleBody(body: string): string {
  return renderMarkdown(body);
}
