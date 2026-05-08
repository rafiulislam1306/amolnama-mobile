import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface AppState {
  // Auth & Session
  user: any | null;
  role: 'admin' | 'manager' | 'user';
  currentDeskId: string | null;
  currentSessionId: string | null;
  
  // Catalog & Cart
  globalCatalog: Record<string, Product>;
  cart: CartItem[];

  // Actions
  setSession: (deskId: string, sessionId: string) => void;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  setInitialData: (data: Partial<AppState>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  role: 'user',
  currentDeskId: null,
  currentSessionId: null,
  globalCatalog: {},
  cart: [],

  setInitialData: (data) => set((state) => ({ ...state, ...data })),
  
  setSession: (deskId, sessionId) => set({ currentDeskId: deskId, currentSessionId: sessionId }),

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
}));