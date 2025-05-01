"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiBarChart2, FiUser, FiLogOut, FiMessageSquare, FiShoppingBag, FiBell } from "react-icons/fi";

export default function SalesRepDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F6] flex">
      {/* Sidebar */}
      <div className={`bg-[#6C4F3D] text-white w-64 p-5 space-y-6 ${sidebarOpen ? "block" : "hidden md:block"}`}>
        <div className="text-2xl font-bold font-serif">Sales Rep</div>
        <nav className="space-y-4">
          <Link href="/salesrep/dashboard" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiBarChart2 /> <span>Dashboard</span>
          </Link>
          <Link href="/salesreporders" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiShoppingBag /> <span>Orders</span>
          </Link>
          <Link href="/customer" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiUser /> <span>Customers</span>
          </Link>
          <Link href="/allproducts-sales" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiMessageSquare /> <span>All Products</span>
          </Link>

          <Link href="/logout">
          <button className="flex items-center space-x-3 mt-10 hover:text-red-400">
            <FiLogOut /> <span>Logout</span>
          </button>
          </Link>
       
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Mobile toggle */}
        <div className="md:hidden mb-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-[#3E4E50]">
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#3E4E50] mb-6">Welcome Back!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold text-[#6C4F3D]">Total Sales</h2>
            <p className="text-2xl font-bold text-[#A97C50]">₵25,400</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold text-[#6C4F3D]">Pending Orders</h2>
            <p className="text-2xl font-bold text-[#A97C50]">7</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold text-[#6C4F3D]">Customers</h2>
            <p className="text-2xl font-bold text-[#A97C50]">132</p>
          </div>
        </div>

      
      </div>
    </div>
  );
}
