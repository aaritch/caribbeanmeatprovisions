import { categories } from '@/data/categories';
import { certifications } from '@/data/certifications';
import { customerTypes } from '@/data/customer-types';
import { countries } from '@/data/countries';
import { serviceAreas } from '@/data/service-areas';
import { team } from '@/data/team';
import { allProducts } from '@/data/products';
import type {
  Category,
  CategorySlug,
  Certification,
  Country,
  CustomerType,
  Product,
  Region,
  ServiceArea,
  TeamMember,
} from '@/types';

const sortByDisplay = <T extends { displayOrder: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.displayOrder - b.displayOrder);

export function getAllCategories(): Category[] {
  return sortByDisplay(categories);
}

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getAllProducts(): Product[] {
  return sortByDisplay(allProducts.filter((p) => p.isActive));
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return sortByDisplay(
    allProducts.filter((p) => p.isActive && p.category === categorySlug),
  );
}

export function getProductBySlug(category: string, slug: string): Product | null {
  return (
    allProducts.find((p) => p.isActive && p.category === category && p.slug === slug) ?? null
  );
}

export function getFeaturedProducts(limit = 8): Product[] {
  return sortByDisplay(allProducts.filter((p) => p.isActive && p.isFeatured)).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return sortByDisplay(
    allProducts.filter(
      (p) => p.isActive && p.category === product.category && p.slug !== product.slug,
    ),
  ).slice(0, limit);
}

export function getServiceAreas(): ServiceArea[] {
  return [...serviceAreas].sort((a, b) => a.country.localeCompare(b.country));
}

const REGION_ORDER: Region[] = [
  'Greater Antilles',
  'Lesser Antilles',
  'Bahamas',
  'Cayman Islands',
  'Other',
];

export function getServiceAreasByRegion(): Record<Region, ServiceArea[]> {
  const grouped: Record<Region, ServiceArea[]> = {
    'Greater Antilles': [],
    'Lesser Antilles': [],
    Bahamas: [],
    'Cayman Islands': [],
    Other: [],
  };
  for (const area of getServiceAreas()) {
    grouped[area.region].push(area);
  }
  return REGION_ORDER.reduce(
    (acc, region) => ({ ...acc, [region]: grouped[region] }),
    {} as Record<Region, ServiceArea[]>,
  );
}

export function getCertifications(): Certification[] {
  return sortByDisplay(certifications);
}

export function getCertificationBySlug(slug: string): Certification | null {
  return certifications.find((c) => c.slug === slug) ?? null;
}

export function getCertificationsForProduct(product: Product): Certification[] {
  return product.certifications
    .map((slug) => getCertificationBySlug(slug))
    .filter((c): c is Certification => c !== null);
}

export function getCustomerTypes(): CustomerType[] {
  return customerTypes;
}

export function getCountriesForForm(): Country[] {
  const caribbean = countries.filter((c) => c.isCaribbean);
  const other = countries.filter((c) => !c.isCaribbean);
  return [...caribbean, ...other];
}

export function getTeamMembers(): TeamMember[] {
  return sortByDisplay(team);
}

export function getCategoryProductCount(slug: CategorySlug): number {
  return allProducts.filter((p) => p.isActive && p.category === slug).length;
}

export function getUniqueOrigins(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.origin))).sort();
}

export function getUniqueCutTypes(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.cutType))).sort();
}

export function getUniquePackaging(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.packaging))).sort();
}

export function getCertificationSlugsInUse(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) p.certifications.forEach((s) => set.add(s));
  return Array.from(set).sort();
}
