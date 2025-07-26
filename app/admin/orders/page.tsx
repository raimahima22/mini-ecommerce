// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Order = {
  id: string;
  customerName: string;
  email: string;
  products: { title: string; quantity: number }[];
  total: number;
};

export default function OrdersPage() {
  useAdminAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders from API or local storage
    setOrders([
      {
        id: "1",
        customerName: "John Doe",
        email: "john@example.com",
        products: [{ title: "Product 1", quantity: 2 }],
        total: 39.98,
      },
      {
        id: "2",
        customerName: "Jane Smith",
        email: "jane@example.com",
        products: [{ title: "Product 2", quantity: 1 }],
        total: 29.99,
      },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded-md bg-white">
            <p><strong>Customer:</strong> {order.customerName} ({order.email})</p>
            <p><strong>Products:</strong></p>
            <ul className="ml-4 list-disc">
              {order.products.map((prod, idx) => (
                <li key={idx}>
                  {prod.title} × {prod.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
