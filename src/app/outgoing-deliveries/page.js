'use client';

import { useState } from 'react';

const OutgoingDeliveries = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL001',
      customerName: 'John Doe',
      address: 'East Legon, Accra',
      items: 3,
      deliveryDate: '2025-04-23',
      status: 'Delivered',
    },
    {
      id: 'DEL002',
      customerName: 'Ama Kwabena',
      address: 'Tema Community 25, Accra',
      items: 2,
      deliveryDate: '2025-04-25',
      status: 'In Transit',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6">
      <h1 className="text-2xl font-bold text-[#3E4E50] mb-6">Outgoing Deliveries</h1>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 text-[#3E4E50]">
          <thead className="bg-[#6C4F3D] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Delivery ID</th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-t border-gray-200">
                <td className="py-3 px-4">{delivery.id}</td>
                <td className="py-3 px-4">{delivery.customerName}</td>
                <td className="py-3 px-4">{delivery.address}</td>
                <td className="py-3 px-4">{delivery.items}</td>
                <td className="py-3 px-4">{delivery.deliveryDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      delivery.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutgoingDeliveries;
