"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const ITEMS_PER_PAGE = 10;

export default function CustomerPage() {
  useAdminAuth();

  const [customers, setCustomers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=50");
        const json = await res.json();
        setCustomers(json.data.data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const name = `${customer.name.first} ${customer.name.last}`.toLowerCase();
    const email = customer.email.toLowerCase();
    return (
      name.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Customers</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full sm:w-80 p-2 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>
              {/* <th className="px-4 py-3 text-left">DOB</th> */}
              <th className="px-4 py-3 text-left">Registered</th>
              {/* <th className="px-4 py-3 text-left">Nationality</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedCustomers.map((cust, index) => (
              <tr key={cust.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <img
                    src={cust.picture.thumbnail}
                    alt={cust.name.first}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span>{`${cust.name.title} ${cust.name.first} ${cust.name.last}`}</span>
                </td>
                <td className="px-4 py-4">{cust.email}</td>
                <td className="px-4 py-4">{cust.phone}</td>
                <td className="px-4 py-4 max-w-[220px] truncate">
                  {`${cust.location.street.number} ${cust.location.street.name}, ${cust.location.city}, ${cust.location.state}, ${cust.location.country}`}
                </td>
                {/* <td className="px-4 py-4">{new Date(cust.dob.date).toLocaleDateString()}</td> */}
                <td className="px-4 py-4">{new Date(cust.registered.date).toLocaleDateString()}</td>
                {/* <td className="px-4 py-4">{cust.nat}</td> */}
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
            className={`px-4 py-2 rounded-xl border font-medium ${
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
