export type CategorySlug = 'beef' | 'pork' | 'poultry' | 'lamb' | 'mutton';

export type CutStyle = 'Bone-in' | 'Boneless' | 'Whole' | 'Portion-cut' | 'Ground';

export type FrozenOrChilled = 'Frozen' | 'Chilled' | 'Fresh';

export type Region =
  | 'Greater Antilles'
  | 'Lesser Antilles'
  | 'Bahamas'
  | 'Cayman Islands'
  | 'Other';

export type Urgency = 'standard' | 'expedited' | 'jit';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  bannerImageUrl: string;
  tileImageUrl: string;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  shortDescription: string;
  longDescription: string;
  cutType: string;
  cutStyle: CutStyle;
  origin: string;
  packaging: string;
  frozenOrChilled: FrozenOrChilled;
  iqfAvailable: boolean;
  averageWeightKg?: number;
  piecesPerCase?: number;
  caseWeightKg?: number;
  storageTempC?: string;
  shelfLifeFrozenMonths?: number;
  minimumOrderQty?: string;
  hsCode?: string;
  suggestedUses?: string;
  certifications: string[];
  primaryImageUrl: string;
  galleryImageUrls: string[];
  specSheetPdfUrl?: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ServiceArea {
  country: string;
  countryCode: string;
  region: Region;
  ports: string[];
  typicalLeadTimeDays: string;
  shippingFrequency?: string;
  notes?: string;
}

export interface Certification {
  slug: string;
  name: string;
  shortName: string;
  issuingBody: string;
  description: string;
  logoUrl: string;
  certificatePdfUrl?: string;
  displayOrder: number;
}

export interface CustomerType {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface Country {
  value: string;
  label: string;
  isCaribbean: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  linkedinUrl?: string;
  displayOrder: number;
}

export interface QuoteFormValues {
  companyName: string;
  companyType: string;
  contactName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  country: string;
  destinationPort: string;
  productSlugs: string[];
  otherProductsText?: string;
  estimatedVolume?: string;
  requiredByDate?: string;
  urgency: Urgency;
  halalRequired: boolean;
  additionalNotes?: string;
  marketingConsent: boolean;
  honeypot: string;
  turnstileToken: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
}

export interface NewsletterFormValues {
  email: string;
  honeypot: string;
  turnstileToken: string;
}
