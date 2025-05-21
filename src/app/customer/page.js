"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(storedCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 relative">
      {/* Close icon */}
      <Link href="/salesrep">
        <button className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-gray-800">
          <AiOutlineClose />
        </button>
      </Link>

      <h2 className="text-2xl font-semibold text-[#3E4E50] mb-4">Customers</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Customer ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#A97C50] text-white">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Customer ID
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Name
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-6 py-4">{customer.id}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">
                  <Link href={`/order-history?customerId=${customer.id}`}>
                    <button className="bg-[#6C4F3D] text-white px-4 py-2 rounded hover:bg-[#A97C50]">
                      View Order History
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
