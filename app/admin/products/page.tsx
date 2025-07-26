"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
};

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  useAdminAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=40&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid");
        const json = await res.json();
        setProducts(json.data.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === "All" || product.category === categoryFilter)
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Products List</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by product name..."
          className="text-sm w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-sm p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-60"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal border-b border-gray-300">
            <tr>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-6 flex items-center gap-4">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="w-12 h-12 rounded object-cover border border-gray-200"
                  />
                  <span className="font-medium">{product.title}</span>
                </td>
                <td className="py-4 px-6 capitalize">{product.category}</td>
                <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                <td className="py-4 px-6 text-green-600">In stock</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 text-sm border rounded-lg ${
              currentPage === index + 1
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
