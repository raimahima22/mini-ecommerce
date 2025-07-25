import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  images: string[];
}

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
