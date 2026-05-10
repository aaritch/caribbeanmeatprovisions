import type { CustomerType } from '@/types';

export const customerTypes: CustomerType[] = [
  {
    slug: 'hotels-resorts',
    name: 'Hotels & Resorts',
    description:
      'Volume-consistent supply for buffets, banquets, and à la carte dining. We support multi-property groups with predictable case sizes, portion-cut SKUs, and just-in-time delivery to property or central commissaries.',
    imageUrl: '/images/customers/hotels.svg',
    iconName: 'Building2',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & Bars',
    description:
      'Premium proteins for steakhouses, casual dining groups, and independent operators. Vacuum-packed portion cuts, fresh and frozen options, and case sizes built around table-count economics.',
    imageUrl: '/images/customers/restaurants.svg',
    iconName: 'UtensilsCrossed',
  },
  {
    slug: 'distributors',
    name: 'Distributors',
    description:
      'Wholesale partnerships with island and regional distributors. Container-loads, cross-dock, consolidation, and 3PL options that integrate with your existing fleet and warehouse systems.',
    imageUrl: '/images/customers/distributors.svg',
    iconName: 'Warehouse',
  },
  {
    slug: 'supermarkets',
    name: 'Supermarkets & Retail',
    description:
      'Retail-ready case-pack and tray-pack programs, traceable origin labelling, and the documentation packs supermarkets need for shelf placement.',
    imageUrl: '/images/customers/supermarkets.svg',
    iconName: 'ShoppingCart',
  },
  {
    slug: 'cruise-lines',
    name: 'Cruise Lines',
    description:
      'Port-of-call provisioning with reefer-container delivery and pre-shipment inspection reports. We move with the schedule of your turn-around windows.',
    imageUrl: '/images/customers/cruise.svg',
    iconName: 'Ship',
  },
  {
    slug: 'institutional',
    name: 'Institutional',
    description:
      'Hospitals, schools, government feeding programs, and corporate canteens. Spec-driven cuts, value-priced trim, and the longer shelf-life packs that institutional procurement requires.',
    imageUrl: '/images/customers/institutional.svg',
    iconName: 'GraduationCap',
  },
];
