"use client";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import close icon
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function ViewAllOrders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter(); // Initialize the router

  // Load orders from localStorage on component mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleClose = () => {
    router.push("/inventoryadmin"); // Navigate to /inventoryadmin when clicked
  };

  return (
    <section className="bg-[#F9F9F6] min-h-screen px-6 py-12 relative">
      {/* Close icon */}
      <FaTimes
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
        size={24}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-8">
          All Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-[#3E4E50] mb-2">
                  Order ID: {order.id}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Date: {order.date || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Customer:{" "}
                  {order.customer
                    ? `${order.customer.fullName || "N/A"} (${order.customer.email || "N/A"})`
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Address:{" "}
                  {order.customer
                    ? `${order.customer.address || "N/A"}, ${order.customer.city || "N/A"}, ${order.customer.country || "N/A"}, ${order.customer.zip || "N/A"}`
                    : "N/A"}
                </p>
                <h4 className="text-md font-semibold text-[#3E4E50] mb-2">
                  Items:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <li key={index}>
                        {item.name || "Unnamed Item"} - £{item.price} x {item.quantity}
                      </li>
                    ))
                  ) : (
                    <li>No items found</li>
                  )}
                </ul>
                <p className="text-md font-semibold text-[#A97C50]">
                  Total: £{order.total ? order.total.toFixed(2) : "0.00"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
