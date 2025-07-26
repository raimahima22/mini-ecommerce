// hooks/useAdminAuth.ts
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuthStore";

export const useAdminAuth = () => {
  const router = useRouter();
  const { isLoggedIn, checkLogin } = useAdminAuthStore();

  useEffect(() => {
    checkLogin();
    if (!localStorage.getItem("admin-auth")) {
      router.push("/admin/login");
    }
  }, [isLoggedIn]);
};
