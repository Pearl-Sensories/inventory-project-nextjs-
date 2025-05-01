'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';

const InventoryView = () => {
  const router = useRouter();

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const defaultInventory = [
      {
        id: 'INV001',
        name: 'Modern Queen Bed',
        category: 'Beds',
        stock: 12,
        location: 'Main Warehouse',
        image: '/bed3.png',
      },
      {
        id: 'INV002',
        name: 'Luxury Sofa Set',
        category: 'Sofas',
        stock: 5,
        location: 'Secondary Warehouse',
        image: '/sofa3.png',
      },
      {
        id: 'INV003',
        name: 'Memory Foam Mattress',
        category: 'Mattresses',
        stock: 18,
        location: 'Main Warehouse',
        image: '/mattress2.png',
      },
    ];

    // Load added products from localStorage
    const stored = JSON.parse(localStorage.getItem('products')) || [];

    // Add IDs and default categories/locations if missing
    const enrichedStored = stored.map((p, index) => ({
      id: `NEW${index + 1}`,
      category: p.category || 'Miscellaneous',
      location: p.location || 'Main Warehouse',
      ...p,
    }));

    // Combine both sets (or replace defaultInventory if you want)
    setInventory([...defaultInventory, ...enrichedStored]);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 relative">
      {/* Close Icon */}
      <button
        onClick={() => router.push('/warehouse-manager')}
        className="absolute top-4 right-4 text-[#A97C50] hover:text-[#6C4F3D] text-2xl"
        title="Close"
      >
        <FiX />
      </button>

      <h1 className="text-2xl font-bold text-[#3E4E50] mb-6">Inventory View</h1>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 text-[#3E4E50]">
          <thead className="bg-[#6C4F3D] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Product ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Warehouse Location</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.stock}</td>
                <td className="py-3 px-4">{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryView;
