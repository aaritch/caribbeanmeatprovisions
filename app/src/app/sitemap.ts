import type { MetadataRoute } from 'next';
import { getAllCategories, getAllProducts } from '@/lib/data';
import { getAllArticles } from '@/lib/resources';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/quality', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/service-area', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/logistics', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/customers', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/resources', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/quote', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  ];

  const categoryEntries = getAllCategories().map((c) => ({
    url: `${SITE_URL}/products/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productEntries = getAllProducts().map((p) => ({
    url: `${SITE_URL}/products/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const articleEntries = getAllArticles().map((a) => ({
    url: `${SITE_URL}/resources/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPaths.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified: now,
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    })),
    ...categoryEntries,
    ...productEntries,
    ...articleEntries,
  ];
}
