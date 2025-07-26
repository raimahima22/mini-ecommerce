"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useAdminAuth(); // optional: protect routes

  const pathname = usePathname();
  const hideSidebar = pathname === "/admin/login";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && <AdminSidebar />}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
