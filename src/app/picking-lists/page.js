"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const INITIAL_PICKING_DATA = [
  { id: 1, product: "Walnut Bed", quantity: 3, location: "Aisle 2 - Shelf 4" },
  { id: 2, product: "Slate Sofa", quantity: 2, location: "Aisle 5 - Shelf 1" },
  { id: 3, product: "Caramel Mattress", quantity: 1, location: "Aisle 1 - Shelf 3" },
  { id: 4, product: "Outdoor Chair Set", quantity: 5, location: "Aisle 6 - Shelf 2" },
];

const DATA_STORAGE_KEY = "pickingListData";
const STATUS_STORAGE_KEY = "pickingStatus";

export default function PickingListsPage() {
  const router = useRouter();
  const [pickingList, setPickingList] = useState([]);
  const [pickedStatus, setPickedStatus] = useState({});
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    location: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem(DATA_STORAGE_KEY);
    const storedStatus = localStorage.getItem(STATUS_STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPickingList(parsedData);
      if (storedStatus) {
        setPickedStatus(JSON.parse(storedStatus));
      } else {
        const initialStatus = parsedData.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setPickedStatus(initialStatus);
      }
    } else {
      setPickingList(INITIAL_PICKING_DATA);
      const initialStatus = INITIAL_PICKING_DATA.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});
      setPickedStatus(initialStatus);
    }
  }, []);

  useEffect(() => {
    if (pickingList.length > 0) {
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(pickingList));
    }
  }, [pickingList]);

  useEffect(() => {
    if (Object.keys(pickedStatus).length > 0) {
      localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(pickedStatus));
    }
  }, [pickedStatus]);

  const togglePicked = (id) => {
    setPickedStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.quantity || !formData.location) return;

    const newItem = {
      id: Date.now(),
      product: formData.product,
      quantity: parseInt(formData.quantity, 10),
      location: formData.location,
    };

    setPickingList((prev) => [...prev, newItem]);
    setPickedStatus((prev) => ({
      ...prev,
      [newItem.id]: false,
    }));

    setFormData({
      product: "",
      quantity: "",
      location: "",
    });
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

      <div className="bg-white rounded-xl shadow overflow-x-auto mb-6">
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
            {pickingList.map(({ id, product, quantity, location }) => (
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

      {/* Add New Item Form - moved here below the table */}
      <form onSubmit={handleAddItem} className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-medium text-[#6C4F3D]">Add New Item</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Warehouse Location"
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[#6C4F3D] text-white px-4 py-2 rounded hover:bg-[#5a3f2f]"
        >
          Add to Picking List
        </button>
      </form>
    </div>
  );
}
