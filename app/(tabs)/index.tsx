export interface Product {
  id: string; // The key (e.g., "sim_no1")
  name: string;
  display: string;
  price: number;
  cat: 'new-sim' | 'paid-rep' | 'foc' | 'service' | 'free-action';
  trackAs: string; // Links to Inventory Groups
  isActive: boolean;
  order: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppStateData {
  currentUser: any;
  currentUserRole: 'admin' | 'manager' | 'user';
  currentDeskId: string | null;
  currentSessionId: string | null;
  globalCatalog: Record<string, Product>;
}