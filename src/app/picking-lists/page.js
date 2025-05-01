"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const pickingListData = [
  { id: 1, product: "Walnut Bed", quantity: 3, location: "Aisle 2 - Shelf 4" },
  { id: 2, product: "Slate Sofa", quantity: 2, location: "Aisle 5 - Shelf 1" },
  { id: 3, product: "Caramel Mattress", quantity: 1, location: "Aisle 1 - Shelf 3" },
  { id: 4, product: "Outdoor Chair Set", quantity: 5, location: "Aisle 6 - Shelf 2" },
];

const LOCAL_STORAGE_KEY = "pickingStatus";

export default function PickingListsPage() {
  const router = useRouter();
  const [pickedStatus, setPickedStatus] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setPickedStatus(JSON.parse(stored));
    } else {
      // Initialize with all not picked
      const initialStatus = pickingListData.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      setPickedStatus(initialStatus);
    }
  }, []);

  // Save to localStorage whenever pickedStatus changes
  useEffect(() => {
    if (Object.keys(pickedStatus).length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pickedStatus));
    }
  }, [pickedStatus]);

  const togglePicked = (id) => {
    setPickedStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 relative">
      {/* Close Icon */}
      <button
        onClick={() => router.push("/warehouse-manager")}
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <h1 className="text-2xl font-semibold text-[#6C4F3D] mb-6">Daily Picking List</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#A97C50] text-white">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Warehouse Location</th>
              <th className="p-4 text-left">Picked</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-[#3E4E50]">
            {pickingListData.map(({ id, product, quantity, location }) => (
              <tr key={id} className="border-b">
                <td className="p-4">{product}</td>
                <td className="p-4">{quantity}</td>
                <td className="p-4">{location}</td>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={pickedStatus[id] || false}
                    onChange={() => togglePicked(id)}
                    className="w-5 h-5 accent-[#6C4F3D]"
                  />
                </td>
                <td className="p-4 font-semibold">
                  {pickedStatus[id] ? "Picked" : "Not Picked"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
