import { Product } from '../types';

export const OFFICIAL_CATALOG: Record<string, Product> = {
    "sim_no1": { name: 'No. 1 Plan', display: 'No. 1 Plan', price: 497, cat: 'new-sim', trackAs: 'No. 1 Plan', isActive: true, order: 1 },
    "sim_prime": { name: 'Prime', display: 'Prime', price: 400, cat: 'new-sim', trackAs: 'Prime', isActive: true, order: 2 },
    "sim_skitto": { name: 'Skitto', display: 'Skitto', price: 400, cat: 'new-sim', trackAs: 'Skitto Kit', isActive: true, order: 4 },
    "rep_regular": { name: 'Regular Replacement', display: 'Regular', price: 400, cat: 'paid-rep', trackAs: 'Regular Kit', isActive: true, order: 10 },
    // ... add others as needed
};