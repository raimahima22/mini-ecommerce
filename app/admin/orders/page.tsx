"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
};

type Order = {
  id: number;
  product: Product;
  address: string;
  date: string;
  status: "Complete" | "Pending" | "Canceled";
};

const ITEMS_PER_PAGE = 10;

export default function OrdersPage() {
  useAdminAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState<"All" | "Complete" | "Pending" | "Canceled">("All");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=50&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid"
        );
        const json = await res.json();
        const products = json.data.data;

        const statuses = ["Complete", "Pending", "Canceled"];
        const fakeOrders = products.map((product: Product, i: number): Order => {
          const day = (i % 30) + 1;
          return {
            id: i + 1,
            product,
            address: `${i * 57 + 100} Example St, City ${i + 1}`,
            date: `2021-04-${day.toString().padStart(2, "0")}`,
            status: statuses[i % statuses.length] as Order["status"],
          };
        });

        setOrders(fakeOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = tab === "All" || order.status === tab;
    const orderDate = new Date(order.date);
    const inDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);
    return matchesStatus && inDateRange;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <div className="flex gap-2 items-center">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null]) => {
              setDateRange(update);
              setCurrentPage(1);
            }}
            isClearable
            placeholderText="Select date range"
            className="p-2 border border-gray-300 rounded-xl text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-6 text-sm font-medium">
        {["All", "Complete", "Pending", "Canceled"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setTab(type as typeof tab);
              setCurrentPage(1);
            }}
            className={`py-2 px-4 rounded-lg ${
              tab === type
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{order.id}</td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <img
                    src={order.product.thumbnail || order.product.images?.[0]}
                    alt={order.product.title}
                    className="w-10 h-10 object-cover rounded border border-gray-200"
                  />
                  <span className="font-medium">{order.product.title}</span>
                </td>
                <td className="px-4 py-4">{order.address}</td>
                <td className="px-4 py-4">{order.date}</td>
                <td className="px-4 py-4">${order.product.price.toFixed(2)}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Complete"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-xl text-gray-700 border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium ${
              currentPage === i + 1
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-xl text-gray-700 border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
