"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminAuthStore } from "@/store/admin/adminAuthStore";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Users,
} from "lucide-react"; // Add Lucide icons

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { label: "Products", href: "/admin/products", icon: <Package size={18} /> },
  { label: "Orders", href: "/admin/orders", icon: <ShoppingCart size={18} /> },
  { label: "Customer", href: "/admin/customer", icon: <Users size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuthStore();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 flex flex-col">
      {/* Logo and App Name */}
      <div className="mb-8 flex items-center space-x-2">
        <Image src={Logo} alt="Logo" width={32} height={32} />
        <span className=" font-bold">Shop Smart</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-md font-medium flex items-center space-x-2 ${
              pathname === href
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <Button
        variant="outline"
        onClick={handleLogout}
        className="mt-8 self-start flex items-center space-x-2"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
