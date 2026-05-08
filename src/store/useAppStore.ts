import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface AppState {
  user: any | null;
  role: string;
  currentDeskId: string | null;
  cart: CartItem[];
  setUser: (user: any) => void;
  setInitialData: (data: any) => void;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  role: 'user',
  currentDeskId: null,
  cart: [],

  setUser: (user) => set({ user }),
  
  setInitialData: (data) => set((state) => ({ ...state, ...data })),

  addToCart: (product) => {
    const currentCart = get().cart;
    const existing = currentCart.find(i => i.id === product.id);
    if (existing) {
      set({ cart: currentCart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ cart: [...currentCart, { ...product, quantity: 1 }] });
    }
  },

  clearCart: () => set({ cart: [] }),

  logout: () => set({ user: null, role: 'user', currentDeskId: null, cart: [] }),
}));