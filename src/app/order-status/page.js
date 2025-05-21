"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["Processing", "In Transit", "Delivered", "Cancelled"];

export default function UpdateOrderStatusPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    setUpdatedStatus((prev) => ({ ...prev, [index]: newStatus }));
  };

  const handleSave = (index) => {
    const updatedOrders = [...orders];
    if (updatedStatus[index]) {
      updatedOrders[index].status = updatedStatus[index];
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setUpdatedStatus((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
      alert(`Status for Order ${orders[index].id} updated successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/warehouse-manager")}
          className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-[#6C4F3D] mb-6">Update Order Status</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-[#A97C50] text-white text-left">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Current Status</th>
              <th className="p-4">Update Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#3E4E50]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">
                    {order.customer?.fullName || order.clientName || "Unknown"}
                  </td>
                  <td className="p-4">
                    {order.items?.[0]?.name || order.product || "Unnamed Product"}
                  </td>
                  <td className="p-4 font-semibold">{order.status || "Pending"}</td>
                  <td className="p-4">
                    <select
                      value={updatedStatus[index] || order.status || "Processing"}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
                    >
                      {statuses.map((status, i) => (
                        <option key={i} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-[#6C4F3D] text-white px-4 py-2 rounded hover:bg-[#A97C50] transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
