"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart2,
  ShoppingCart,
  Users,
  DollarSign,
  CircleUser,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { name: "10 AM", revenue: 4000 },
  { name: "1 PM", revenue: 7000 },
  { name: "4 PM", revenue: 11000 },
  { name: "7 PM", revenue: 8738 },
  { name: "10 PM", revenue: 6500 },
  { name: "1 AM", revenue: 5800 },
  { name: "4 AM", revenue: 7900 },
  { name: "7 AM", revenue: 9000 },
];

const donutData = [
  { name: "Net Profit", value: 32340 },
  { name: "Expenses", value: 8068 },
  { name: "Taxes", value: 2560 },
];

const donutColors = ["#16a34a", "#f97316", "#eab308"];

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  thumbnail?: string;
  images?: string[];
  rating?: { rate: number };
};

const mockCustomers = ["Alice", "Bob", "Charlie", "Daisy", "Ethan"];

export default function DashboardPage() {
  const [stats] = useState({
    totalSales: 25240,
    totalOrders: 3469,
    productViews: 680000,
    revenue: 510000,
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomproducts")
      .then((res) => res.json())
      .then((resData) => {
        const safeProducts = resData?.data?.data ?? resData?.data ?? [];
        setProducts(safeProducts);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Left side: Page Title */}
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Right side: Welcome Badge */}
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md">
          <CircleUser className="w-5 h-5 text-blue-600" />
          <div className="text-sm">
            <p className="text-xs text-muted-foreground">Welcome Back</p>
            <p className="font-medium">Admin</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={<DollarSign className="text-green-500" />}
          change="+3.4%"
        />
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<ShoppingCart className="text-blue-500" />}
          change="+12.8%"
        />
        <DashboardCard
          title="Product View"
          value={`${(stats.productViews / 1000).toFixed(0)}K`}
          icon={<Users className="text-red-400" />}
          change="-2.4%"
        />
        <DashboardCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={<BarChart2 className="text-purple-500" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Report</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <PieChart width={250} height={250}>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={donutColors[index % donutColors.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </CardContent>
        </Card>
      </div>

      {/* Orders and Products Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Recent Orders */}
        <Card className="xl:col-span-1">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <span className="text-sm text-primary text-orange-500 cursor-pointer">
              See All
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium">{product.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {mockCustomers[index % mockCustomers.length]}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">${product.price}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Popular Products */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Popular Products</CardTitle>
            <div className="text-sm text-orange-500 text-muted-foreground">
              Top Rated
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-muted transition"
                  >
                    <td className="py-2 flex items-center gap-2">
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <span>{product.title}</span>
                    </td>
                    <td className="py-2">{product.category || "General"}</td>
                    <td className="py-2">${product.price}</td>
                    <td className="py-2">
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        In Stock
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs mt-1 ${
              change.startsWith("-") ? "text-red-500" : "text-green-600"
            }`}
          >
            {change} vs last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}
