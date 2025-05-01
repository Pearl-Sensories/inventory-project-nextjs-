"use client";
import Link from "next/link";
import { useState } from "react";
import { FiBox, FiTruck, FiClipboard, FiBell, FiHome, FiLogOut, FiPackage } from "react-icons/fi";

export default function WarehouseDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
          <button onClick={() => setActiveTab("incoming")}
            className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
            <FiPackage /> <span>Incoming Shipments</span>
          </button>
          </Link>

          <Link href="outgoing-shipments">
          <button onClick={() => setActiveTab("outgoing")}
            className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
            <FiTruck /> <span>Outgoing Shipments</span>
          </button>
          </Link>

           <Link href="/inventory-view">
          <button onClick={() => setActiveTab("inventory")}
            className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
            <FiBox /> <span>Inventory View</span>
          </button>
          </Link>

          <Link href="/order-status">
          <button onClick={() => setActiveTab("logs")}
            className="flex items-center space-x-3 mb-3 hover:text-[#A97C50]">
            <FiClipboard /> <span>Update order status</span>
          </button>
          </Link>

        <Link href="/picking-lists">
          <button onClick={() => setActiveTab("notifications")}
            className="flex items-center space-x-3 hover:text-[#A97C50]">
            <FiBell /> <span>Generate-picking-lists</span>
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

        {/* You can later replace the tabs below with separate components/pages */}
        {activeTab === "incoming" && <p>📦 Incoming shipments page</p>}
        {activeTab === "outgoing" && <p>🚚 Outgoing shipments page</p>}
        {activeTab === "inventory" && <p>📋 Inventory view page</p>}
        {activeTab === "logs" && <p>📑 Stock logs page</p>}
        {activeTab === "notifications" && <p>🔔 Notifications page</p>}
      </main>
    </div>
  );
}
