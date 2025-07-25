import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  selected?: boolean;
}

interface CartStore {
  cart: CartItem[];
  buyNowItem: CartItem | null; 
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setBuyNowItem: (item: CartItem | null) => void; 
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  buyNowItem: null,
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        cart: [...state.cart,item],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  setBuyNowItem: (item) => set({ buyNowItem: item }),
}));