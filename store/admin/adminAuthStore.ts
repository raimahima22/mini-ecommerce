// store/adminAuthStore.ts
import { create } from "zustand";

interface AdminAuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  checkLogin: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isLoggedIn: typeof window !== "undefined" && localStorage.getItem("admin-auth") === "true",
  
  login: () => {
    localStorage.setItem("admin-auth", "true");
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("admin-auth");
    set({ isLoggedIn: false });
  },

  checkLogin: () => {
    const isLogged = localStorage.getItem("admin-auth") === "true";
    set({ isLoggedIn: isLogged });
  },
}));
