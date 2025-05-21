"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiBox, FiTruck, FiClipboard, FiBell, FiHome, FiLogOut, FiPackage } from "react-icons/fi";

export default function WarehouseDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#F9F9F6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#866543] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">Warehouse Manager</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab("overview")} className="flex items-center space-x-3 hover:text-[#A97C50]">
            <FiHome /> <span>Dashboard Overview</span>
          </button>

          <Link href="incoming-shipments">
            <button onClick={() => setActiveTab("incoming")} className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
              <FiPackage /> <span>Incoming Shipments</span>
            </button>
          </Link>

          <Link href="outgoing-shipments">
            <button onClick={() => setActiveTab("outgoing")} className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
              <FiTruck /> <span>Outgoing Shipments</span>
            </button>
          </Link>

          <Link href="/inventory-view">
            <button onClick={() => setActiveTab("inventory")} className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
              <FiBox /> <span>Inventory View</span>
            </button>
          </Link>

          <Link href="/order-status">
            <button onClick={() => setActiveTab("logs")} className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
              <FiClipboard /> <span>Update Order Status</span>
            </button>
          </Link>

          <Link href="/picking-lists">
            <button onClick={() => setActiveTab("notifications")} className="flex items-center space-x-3 hover:text-[#A97C50]">
              <FiBell /> <span>Generate Picking Lists</span>
            </button>
          </Link>

          <Link href="/logout">
            <button className="flex items-center space-x-3 mt-10 hover:text-red-400">
              <FiLogOut /> <span>Logout</span>
            </button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold text-[#3E4E50] mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-2xl p-6">
                <h3 className="text-lg font-medium text-[#6C4F3D]">Incoming Shipments</h3>
                <p className="text-3xl font-bold mt-2">1</p>
              </div>

              <Link href="outgoing-deliveries">
                <div className="bg-white shadow rounded-2xl  p-6">
                  <h3 className="text-lg font-medium text-[#6C4F3D]">Outgoing Deliveries</h3>
                  <p className="text-3xl font-bold mt-2">2</p>
                </div>
              </Link>

              <Link href="/low-stock">
                <div className="bg-white shadow rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-[#6C4F3D]">Low Stock Items</h3>
                  <p className="text-3xl font-bold mt-2">3</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "incoming" && <p>📦 Incoming Shipments page</p>}
        {activeTab === "outgoing" && <p>🚚 Outgoing Shipments page</p>}
        {activeTab === "inventory" && <p>📋 Inventory View page</p>}
        {activeTab === "logs" && <p>📑 Stock Logs page</p>}
        {activeTab === "notifications" && <p>🔔 Notifications page</p>}

        {activeTab === "orders" && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-[#6C4F3D] mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders available.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow p-6 space-y-2 border border-gray-200">
                    <h3 className="text-xl font-semibold text-[#3E4E50]">Order ID: {order.id}</h3>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>

                    <div className="mt-2">
                      <h4 className="font-semibold text-[#6C4F3D]">Items:</h4>
                      <ul className="text-sm mt-2 pl-4 list-disc">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name || item.product?.name || "Unnamed Product"} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2 text-sm">
                      <p><span className="font-medium">Customer:</span> {order.customer.fullName}</p>
                      <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                      <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                      <p><span className="font-medium">Address:</span> {order.customer.address}, {order.customer.city}, {order.customer.country} - {order.customer.zip}</p>
                    </div>

                    <div className="mt-2 text-right">
                      <span className="font-bold text-[#A97C50] text-lg">Total: ${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
