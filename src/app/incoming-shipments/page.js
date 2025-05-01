'use client';

import { useEffect, useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const IncomingShipments = () => {
  const router = useRouter(); // useRouter hook for navigation
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState({
    id: '',
    supplier: '',
    items: '',
    estimatedArrival: '',
    status: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('shipments');
    if (stored) {
      setShipments(JSON.parse(stored));
    } else {
      const initial = [
        {
          id: 'SHIP001',
          supplier: 'Classic Wood Co.',
          items: 45,
          estimatedArrival: '2025-05-01',
          status: 'In Transit',
        },
        {
          id: 'SHIP002',
          supplier: 'Comfy Living',
          items: 20,
          estimatedArrival: '2025-04-28',
          status: 'Pending',
        },
      ];
      localStorage.setItem('shipments', JSON.stringify(initial));
      setShipments(initial);
    }
  }, []);

  // Save to localStorage whenever shipments change
  const saveToLocalStorage = (updatedShipments) => {
    localStorage.setItem('shipments', JSON.stringify(updatedShipments));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedShipments;
    if (editIndex !== null) {
      updatedShipments = [...shipments];
      updatedShipments[editIndex] = form;
      setEditIndex(null);
    } else {
      const newId = `SHIP${(shipments.length + 1).toString().padStart(3, '0')}`;
      const newShipment = { ...form, id: newId };
      updatedShipments = [...shipments, newShipment];
    }

    setShipments(updatedShipments);
    saveToLocalStorage(updatedShipments);

    setForm({
      id: '',
      supplier: '',
      items: '',
      estimatedArrival: '',
      status: '',
    });
  };

  const handleEdit = (index) => {
    setForm(shipments[index]);
    setEditIndex(index);
  };

  // Handle closing and navigating to /warehouse-manager
  const handleClose = () => {
    router.push('/warehouse-manager');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 relative">

      {/* Close Icon */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-[#A97C50] hover:text-[#6C4F3D] text-2xl"
        title="Close"
      >
        <FiX />
      </button>

      <h1 className="text-2xl font-bold text-[#3E4E50] mb-6">Incoming Shipments</h1>

      <div className="overflow-x-auto shadow-md rounded-xl mb-8">
        <table className="min-w-full bg-white border border-gray-200 text-[#3E4E50]">
          <thead className="bg-[#A97C50] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Edit</th>
              <th className="py-3 px-4 text-left">Shipment ID</th>
              <th className="py-3 px-4 text-left">Supplier</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Estimated Arrival</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr key={shipment.id} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-[#A97C50] hover:text-[#6C4F3D]"
                  >
                    <FiEdit2 />
                  </button>
                </td>
                <td className="py-3 px-4">{shipment.id}</td>
                <td className="py-3 px-4">{shipment.supplier}</td>
                <td className="py-3 px-4">{shipment.items}</td>
                <td className="py-3 px-4">{shipment.estimatedArrival}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shipment.status === 'In Transit'
                        ? 'bg-yellow-100 text-yellow-800'
                        : shipment.status === 'Pending'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            placeholder="Supplier"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            name="items"
            value={form.items}
            onChange={handleChange}
            placeholder="Number of Items"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="date"
            name="estimatedArrival"
            value={form.estimatedArrival}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Status</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#A97C50] text-white px-6 py-2 rounded hover:bg-[#6C4F3D]"
        >
          {editIndex !== null ? 'Update Shipment' : 'Add Shipment'}
        </button>
      </form>
    </div>
  );
};

export default IncomingShipments;
