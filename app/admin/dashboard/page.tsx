// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Stat, StatLabel, StatNumber } from "@/components/ui/Stat";
import AdminSidebar from "@/components/admin/AdminSidebar";
export default function DashboardPage() {
  // Example static data — replace with API calls as needed
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Fetch data from API (example placeholders)
    setTotalProducts(120);
    setTotalOrders(85);
    setTotalRevenue(35000);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Stat>
              <StatNumber>{totalProducts}</StatNumber>
              <StatLabel>Products in Store</StatLabel>
            </Stat>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Stat>
              <StatNumber>{totalOrders}</StatNumber>
              <StatLabel>Orders Placed</StatLabel>
            </Stat>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Stat>
              <StatNumber>${totalRevenue.toLocaleString()}</StatNumber>
              <StatLabel>Revenue Earned</StatLabel>
            </Stat>
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
}
