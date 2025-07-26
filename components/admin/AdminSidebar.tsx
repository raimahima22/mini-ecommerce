// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminAuthStore } from "@/store/admin/adminAuthStore";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuthStore();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 flex flex-col">
      <div className="mb-8 text-2xl font-bold">Admin Panel</div>

      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-md font-medium ${
              pathname === href
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </aside>
  );
}
