// store/checkoutStore.ts
import { create } from "zustand";

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface CheckoutState {
  items: CheckoutItem[];
  setItems: (items: CheckoutItem[]) => void;
  clear: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clear: () => set({ items: [] }),
}));
