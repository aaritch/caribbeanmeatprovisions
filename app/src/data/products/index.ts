import { beef } from './beef';
import { pork } from './pork';
import { poultry } from './poultry';
import { lamb } from './lamb';
import { mutton } from './mutton';
import type { Product } from '@/types';

export const allProducts: Product[] = [...beef, ...pork, ...poultry, ...lamb, ...mutton];

export { beef, pork, poultry, lamb, mutton };
