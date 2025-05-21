import Link from "next/link";
import React from "react";
import { FiBox, FiList, FiBell, FiPlusCircle, FiFileText } from "react-icons/fi";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

export default function InventoryAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F9F9F6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#6d4b35] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-serif font-semibold mb-6">Inventory Admin</h2>
        <nav className="space-y-4 text-base">
          <a href="#overview" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiBox /> <span>Dashboard Overview</span>
          </a>
          <a href="/add/editproducts" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiPlusCircle /> <span>Add / Edit Products</span>
          </a>
        
        
          <a href="/export-reports" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiList /> <span>Export Reports</span>
          </a>

          <a href="/saved-reports" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiList /> <span>View Saved Reports</span>
          </a>

          <a href="/view-all-orders" className="flex items-center space-x-2 hover:text-[#A97C50]">
            <FiBell /> <span>View All Orders</span>
          </a>

          <a href="/view-all-products" className="flex items-center space-x-2 hover:text-[#A97C50]">
          <MdAlignHorizontalLeft /> <span>View All Products</span>
          </a>

          <a href="/logout" className="flex items-center space-x-2 hover:text-[#A97C50]">
          <IoLogOutOutline /> <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E4DCD3]">
            <h3 className="text-[#3E4E50] font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-[#6C4F3D]">20</p>
          </div>

         <Link href="/out-of-stock">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E4DCD3]">
            <h3 className="text-[#3E4E50] font-medium">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-500">4</p>
          </div>
          </Link>

          <Link href="/low-stock">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E4DCD3]">
            <h3 className="text-[#3E4E50] font-medium">Low Stock Alerts</h3>
            <p className="text-3xl font-bold text-yellow-500">3</p>
          </div>
          </Link>

          <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E4DCD3]">
            <h3 className="text-[#3E4E50] font-medium">Inventory Value</h3>
            <p className="text-3xl font-bold text-[#6C4F3D]">$86,400</p>
          </div>
        </div>

        {/* Responsive Note */}
        <div className="mt-10 text-sm text-[#6C4F3D] font-medium">
          Use the side menu to manage products, stock, and view reports.
        </div>
      </main>
    </div>
  );
}
