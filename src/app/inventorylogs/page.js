"use client";

import { useState } from "react";

export default function InventoryLogs() {
  const [inventoryLogs, setInventoryLogs] = useState([
    {
      id: 1,
      action: "Stock Update",
      product: "Sofa Set",
      previousStock: 5,
      newStock: 8,
      date: "2025-04-20 10:30 AM",
    },
    {
      id: 2,
      action: "Stock Update",
      product: "Mattress",
      previousStock: 10,
      newStock: 12,
      date: "2025-04-20 12:15 PM",
    },
    {
      id: 3,
      action: "Product Added",
      product: "Dining Table",
      previousStock: 0,
      newStock: 20,
      date: "2025-04-19 09:00 AM",
    },
    {
      id: 4,
      action: "Stock Update",
      product: "Chair",
      previousStock: 15,
      newStock: 10,
      date: "2025-04-18 03:45 PM",
    },
  ]);

  const [newLog, setNewLog] = useState({
    action: "",
    product: "",
    previousStock: 0,
    newStock: 0,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLog({
      ...newLog,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLogEntry = {
      ...newLog,
      id: inventoryLogs.length + 1,
      date: new Date().toLocaleString(),
    };

    setInventoryLogs([...inventoryLogs, newLogEntry]);

    // Clear form after submission
    setNewLog({
      action: "",
      product: "",
      previousStock: 0,
      newStock: 0,
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6">
      <h2 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-6">
        Inventory Logs
      </h2>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-[#3E4E50]">Action</th>
              <th className="px-4 py-2 text-left text-[#3E4E50]">Product</th>
              <th className="px-4 py-2 text-left text-[#3E4E50]">Previous Stock</th>
              <th className="px-4 py-2 text-left text-[#3E4E50]">New Stock</th>
              <th className="px-4 py-2 text-left text-[#3E4E50]">Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryLogs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{log.product}</td>
                <td className="px-4 py-2">{log.previousStock}</td>
                <td className="px-4 py-2">{log.newStock}</td>
                <td className="px-4 py-2">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Log Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-[#6C4F3D] mb-4">Add New Log</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="action" className="block text-[#3E4E50]">
                Action
              </label>
              <input
                type="text"
                name="action"
                id="action"
                value={newLog.action}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Stock Update or Product Added"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="product" className="block text-[#3E4E50]">
                Product
              </label>
              <input
                type="text"
                name="product"
                id="product"
                value={newLog.product}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="previousStock" className="block text-[#3E4E50]">
                Previous Stock
              </label>
              <input
                type="number"
                name="previousStock"
                id="previousStock"
                value={newLog.previousStock}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Previous Stock"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="newStock" className="block text-[#3E4E50]">
                New Stock
              </label>
              <input
                type="number"
                name="newStock"
                id="newStock"
                value={newLog.newStock}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="New Stock"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#6C4F3D] text-white font-semibold rounded-md mt-4 hover:bg-[#A97C50] transition-colors"
          >
            Add Log Entry
          </button>
        </form>
      </div>
    </div>
  );
}
