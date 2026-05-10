import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd(), 'public/images');

function svg({ width, height, bg, fg, label, sub }) {
  const viewW = width;
  const viewH = height;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewW} ${viewH}" width="${viewW}" height="${viewH}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${shade(bg, -0.25)}"/>
    </linearGradient>
    <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="${shade(bg, -0.05)}" fill-opacity="0.35"/>
      <circle cx="1" cy="1" r="0.5" fill="${shade(bg, -0.15)}" fill-opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="${viewW}" height="${viewH}" fill="url(#g)"/>
  <rect width="${viewW}" height="${viewH}" fill="url(#grain)" opacity="0.18"/>
  <g font-family="Georgia, serif" fill="${fg}" text-anchor="middle">
    <text x="${viewW / 2}" y="${viewH / 2}" font-size="${Math.round(Math.min(viewW, viewH) / 12)}" font-weight="700">${escape(label)}</text>
    ${sub ? `<text x="${viewW / 2}" y="${viewH / 2 + Math.round(Math.min(viewW, viewH) / 12)}" font-size="${Math.round(Math.min(viewW, viewH) / 24)}" font-weight="400" opacity="0.85">${escape(sub)}</text>` : ''}
  </g>
</svg>`;
}

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shade(hex, amt) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, Math.round(parseInt(h.slice(0, 2), 16) * (1 + amt))));
  const g = Math.max(0, Math.min(255, Math.round(parseInt(h.slice(2, 4), 16) * (1 + amt))));
  const b = Math.max(0, Math.min(255, Math.round(parseInt(h.slice(4, 6), 16) * (1 + amt))));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function write(rel, content) {
  const full = resolve(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

const PALETTE = {
  beef: '#7a1f1f',
  pork: '#b58a72',
  poultry: '#c98b3b',
  lamb: '#5a3a2f',
  mutton: '#3b2a25',
  cream: '#F5F1E8',
  charcoal: '#1A1A1A',
  gold: '#C9A961',
  green: '#2D5016',
};

// Categories
const categories = ['beef', 'pork', 'poultry', 'lamb', 'mutton'];
for (const cat of categories) {
  write(`categories/${cat}-banner.svg`, svg({ width: 2400, height: 1200, bg: PALETTE[cat], fg: '#fff', label: cat.toUpperCase(), sub: 'Caribbean Meat Provisions' }));
  write(`categories/${cat}-tile.svg`, svg({ width: 1200, height: 1200, bg: PALETTE[cat], fg: '#fff', label: cat[0].toUpperCase() + cat.slice(1), sub: 'Browse cuts →' }));
}

// Hero
write('hero/hero-collage.svg', svg({ width: 2880, height: 1620, bg: PALETTE.charcoal, fg: PALETTE.cream, label: 'Caribbean Meat Provisions', sub: 'Beef · Pork · Poultry · Lamb · Mutton' }));

// Service area map
write('service-area/caribbean-map.svg', svg({ width: 1600, height: 900, bg: '#0e3b53', fg: PALETTE.cream, label: 'Caribbean Service Area', sub: 'Ports across 20+ countries' }));

// Logistics
write('logistics/reefer.svg', svg({ width: 2400, height: 1200, bg: '#2c4a5c', fg: PALETTE.cream, label: 'Cold Chain Logistics', sub: 'Reefer · Cross-dock · 3PL' }));

// Customers
const customers = [
  ['hotels', 'Hotels & Resorts', '#3a4a5e'],
  ['restaurants', 'Restaurants', '#5a3327'],
  ['distributors', 'Distributors', '#3a4435'],
  ['supermarkets', 'Supermarkets', '#5b4a2c'],
  ['cruise', 'Cruise Lines', '#1f3a5e'],
  ['institutional', 'Institutional', '#4a3a4f'],
];
for (const [slug, label, bg] of customers) {
  write(`customers/${slug}.svg`, svg({ width: 1600, height: 1000, bg, fg: '#fff', label, sub: 'Caribbean B2B' }));
}

// Certifications
const certs = ['haccp', 'usda', 'iso-22000', 'brc', 'fssc-22000', 'halal', 'fda', 'certified-angus', 'grass-fed'];
for (const c of certs) {
  write(`certifications/${c}.svg`, svg({ width: 800, height: 800, bg: PALETTE.cream, fg: PALETTE.charcoal, label: c.toUpperCase().replace(/-/g, ' '), sub: 'Certified' }));
}

// Products — slugs from data files
const products = [
  // beef
  ['beef-ribeye', 'Ribeye', PALETTE.beef],
  ['beef-tenderloin', 'Tenderloin', PALETTE.beef],
  ['beef-striploin', 'Striploin', PALETTE.beef],
  ['beef-brisket', 'Brisket', PALETTE.beef],
  ['beef-short-ribs', 'Short Ribs', PALETTE.beef],
  ['beef-ground', 'Ground Beef', PALETTE.beef],
  // pork
  ['pork-loin', 'Pork Loin', PALETTE.pork],
  ['pork-belly', 'Pork Belly', PALETTE.pork],
  ['pork-spare-ribs', 'Spare Ribs', PALETTE.pork],
  ['pork-shoulder', 'Pork Shoulder', PALETTE.pork],
  ['pork-ground', 'Ground Pork', PALETTE.pork],
  // poultry
  ['poultry-whole', 'Whole Chicken', PALETTE.poultry],
  ['poultry-breast', 'Chicken Breast', PALETTE.poultry],
  ['poultry-leg', 'Leg Quarters', PALETTE.poultry],
  ['poultry-wings', 'Chicken Wings', PALETTE.poultry],
  ['poultry-drumsticks', 'Drumsticks', PALETTE.poultry],
  // lamb
  ['lamb-rack', 'Lamb Rack', PALETTE.lamb],
  ['lamb-loin', 'Lamb Loin', PALETTE.lamb],
  ['lamb-leg', 'Lamb Leg', PALETTE.lamb],
  ['lamb-shanks', 'Lamb Shanks', PALETTE.lamb],
  // mutton
  ['mutton-stew', 'Mutton Stew', PALETTE.mutton],
  ['mutton-leg', 'Mutton Leg', PALETTE.mutton],
  ['mutton-shoulder', 'Mutton Shoulder', PALETTE.mutton],
];
for (const [slug, label, bg] of products) {
  write(`products/${slug}.svg`, svg({ width: 1600, height: 1600, bg, fg: '#fff', label, sub: 'Caribbean Meat Provisions' }));
}

console.log('placeholders generated');
