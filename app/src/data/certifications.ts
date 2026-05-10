import type { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    slug: 'haccp',
    name: 'Hazard Analysis Critical Control Point',
    shortName: 'HACCP',
    issuingBody: 'Codex Alimentarius / national food safety authorities',
    description:
      'A systematic preventive approach to food safety that identifies, evaluates, and controls hazards from raw material through finished product distribution.',
    logoUrl: '/images/certifications/haccp.svg',
    displayOrder: 1,
  },
  {
    slug: 'usda',
    name: 'USDA Inspected',
    shortName: 'USDA',
    issuingBody: 'United States Department of Agriculture, Food Safety and Inspection Service',
    description:
      'Continuous federal inspection of meat and poultry slaughter and processing in compliance with the Federal Meat Inspection Act.',
    logoUrl: '/images/certifications/usda.svg',
    displayOrder: 2,
  },
  {
    slug: 'iso-22000',
    name: 'ISO 22000 Food Safety Management',
    shortName: 'ISO 22000',
    issuingBody: 'International Organization for Standardization',
    description:
      'International food safety management system standard combining ISO 9001 management principles with HACCP food safety controls.',
    logoUrl: '/images/certifications/iso-22000.svg',
    displayOrder: 3,
  },
  {
    slug: 'brc',
    name: 'BRC Global Standard for Food Safety',
    shortName: 'BRC',
    issuingBody: 'British Retail Consortium',
    description:
      'A retailer-driven certification covering food safety, quality, and operational criteria for manufacturers supplying branded retail products.',
    logoUrl: '/images/certifications/brc.svg',
    displayOrder: 4,
  },
  {
    slug: 'fssc-22000',
    name: 'FSSC 22000 Food Safety System Certification',
    shortName: 'FSSC 22000',
    issuingBody: 'Foundation FSSC',
    description:
      'GFSI-recognised certification scheme based on ISO 22000 and sector-specific PRPs, broadly accepted across major foodservice and retail buyers.',
    logoUrl: '/images/certifications/fssc-22000.svg',
    displayOrder: 5,
  },
  {
    slug: 'halal',
    name: 'Halal Certified',
    shortName: 'Halal',
    issuingBody: 'JAKIM, BPJPH, GAC, HAK and other accredited bodies',
    description:
      'Verification that meat and poultry are processed in accordance with Islamic dietary law, supporting Muslim foodservice and retail markets.',
    logoUrl: '/images/certifications/halal.svg',
    displayOrder: 6,
  },
  {
    slug: 'fda',
    name: 'FDA Registered Facility',
    shortName: 'FDA',
    issuingBody: 'United States Food and Drug Administration',
    description:
      'Facility registered with FDA for handling and exporting food products to the United States and territories.',
    logoUrl: '/images/certifications/fda.svg',
    displayOrder: 7,
  },
  {
    slug: 'certified-angus',
    name: 'Certified Angus Beef',
    shortName: 'Certified Angus',
    issuingBody: 'Certified Angus Beef LLC',
    description:
      'Premium beef brand specification for Angus-influenced cattle meeting ten standards for marbling, maturity, and quality.',
    logoUrl: '/images/certifications/certified-angus.svg',
    displayOrder: 8,
  },
  {
    slug: 'grass-fed',
    name: 'Grass-Fed Certified',
    shortName: 'Grass-Fed',
    issuingBody: 'A Greener World / AGW',
    description:
      'Independent verification that animals are raised on pasture and finished on a 100% forage diet for the duration of their lives.',
    logoUrl: '/images/certifications/grass-fed.svg',
    displayOrder: 9,
  },
];
