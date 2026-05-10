import type { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'beef',
    name: 'Beef',
    shortDescription: 'Premium cuts and trim from leading USDA, Brazilian, and Australian programs.',
    description:
      'Our beef program covers the full carcass: ribeye, tenderloin, striploin, brisket, short ribs, chuck, ground, trim, and offals. We source from USDA-inspected, Certified Angus, grass-fed, and Halal-certified suppliers across the Americas and the Pacific. Available frozen, chilled, IQF, vacuum-packed, and case-pack — built for hotel buffets, premium steakhouse menus, supermarket retail packs, and cruise galleys.',
    bannerImageUrl: '/images/categories/beef-banner.svg',
    tileImageUrl: '/images/categories/beef-tile.svg',
    displayOrder: 1,
  },
  {
    slug: 'pork',
    name: 'Pork',
    shortDescription: 'Pork cuts, ribs, bellies, and trim from USDA and EU-certified programs.',
    description:
      'A complete pork program: loins, ribs, bellies, shoulders, hams, ground, and offals. Sourced from USDA and EU-approved facilities with full traceability. Vacuum-packed, IQF, and case-pack options support every kitchen and retail use case across the Caribbean.',
    bannerImageUrl: '/images/categories/pork-banner.svg',
    tileImageUrl: '/images/categories/pork-tile.svg',
    displayOrder: 2,
  },
  {
    slug: 'poultry',
    name: 'Poultry',
    shortDescription: 'Whole birds, breasts, legs, wings, and further-processed products.',
    description:
      'Whole chickens, breast fillets, leg quarters, wings, drumsticks, MDM, and value-added further-processed lines. USDA, Halal, and EU-origin available. IQF dominates the program for case-of-the-month convenience and consistent menu planning.',
    bannerImageUrl: '/images/categories/poultry-banner.svg',
    tileImageUrl: '/images/categories/poultry-tile.svg',
    displayOrder: 3,
  },
  {
    slug: 'lamb',
    name: 'Lamb',
    shortDescription: 'New Zealand and Australian lamb in racks, loins, legs, and shanks.',
    description:
      'A full lamb program from New Zealand and Australia: racks, loins, legs, shoulders, shanks, and ground. Halal certification on every Australian SKU. Frozen and chilled options support both white-tablecloth fine dining and hotel banquet operations.',
    bannerImageUrl: '/images/categories/lamb-banner.svg',
    tileImageUrl: '/images/categories/lamb-tile.svg',
    displayOrder: 4,
  },
  {
    slug: 'mutton',
    name: 'Mutton',
    shortDescription: 'Bone-in and boneless mutton cuts with full Halal certification.',
    description:
      'Mutton from Australia and New Zealand, primarily Halal-certified to support traditional Caribbean menus and the regional Indo-Caribbean and Muslim foodservice trade. Bone-in shoulders, leg, ground, and stew cuts available frozen.',
    bannerImageUrl: '/images/categories/mutton-banner.svg',
    tileImageUrl: '/images/categories/mutton-tile.svg',
    displayOrder: 5,
  },
];
