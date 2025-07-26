// app/admin/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function ProductsPage() {
  useAdminAuth();

  const [products, setProducts] = useState<Array<{id: string; title: string; price: number;}>>([]);

  useEffect(() => {
    // Fetch products from API - replace with real API
    setProducts([
      { id: "1", title: "Product 1", price: 19.99 },
      { id: "2", title: "Product 2", price: 29.99 },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products List</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-md bg-white">
            <h2 className="font-semibold">{product.title}</h2>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
