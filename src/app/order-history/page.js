"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const orders = [
  {
    id: "ORD001",
    date: "2025-04-01",
    items: [
      { name: "Walnut Queen Bed", quantity: 1, price: "$450" },
      { name: "Memory Foam Mattress", quantity: 1, price: "$320" },
    ],
    total: "$770",
    status: "Delivered",
  },
  {
    id: "ORD002",
    date: "2025-03-15",
    items: [{ name: "Caramel Sofa", quantity: 1, price: "$620" }],
    total: "$620",
    status: "Shipped",
  },
];

export default function OrderHistory() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 text-[#3E4E50]">
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-[#A97C50] hover:underline mb-6"
      >
        <FiArrowLeft /> <span>Back to Customers</span>
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-[#6C4F3D]">
        Order History - Customer ID: CUST001
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-[#3E4E50]">
                Order #{order.id}
              </h3>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            <ul className="mb-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item.quantity} x {item.name} - <strong>{item.price}</strong>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-3">
              <span className="font-medium text-[#6C4F3D]">Total: {order.total}</span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
