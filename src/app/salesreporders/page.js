"use client";

import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    clientName: "",
    product: "",
    quantity: "",
    address: "",
  });

  const [editingOrderId, setEditingOrderId] = useState(null);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Save orders to localStorage when changed
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateOrder = () => {
    if (!newOrder.clientName || !newOrder.product || !newOrder.quantity || !newOrder.address) return;

    if (editingOrderId !== null) {
      const updatedOrders = orders.map((order) =>
        order.id === editingOrderId ? { ...order, ...newOrder } : order
      );
      setOrders(updatedOrders);
      setEditingOrderId(null);
    } else {
      const newOrderWithId = { ...newOrder, id: Date.now() };
      setOrders([...orders, newOrderWithId]);

      // Save customer to localStorage
      const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
      const customerExists = storedCustomers.some(c => c.name === newOrder.clientName);
      if (!customerExists) {
        const newCustomer = {
          id: `CUST${Date.now().toString().slice(-5)}`,
          name: newOrder.clientName,
        };
        localStorage.setItem("customers", JSON.stringify([...storedCustomers, newCustomer]));
      }
    }

    setNewOrder({ clientName: "", product: "", quantity: "", address: "" });
  };

  const handleEdit = (order) => {
    setNewOrder({
      clientName: order.clientName,
      product: order.product,
      quantity: order.quantity,
      address: order.address,
    });
    setEditingOrderId(order.id);
  };

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 text-[#3E4E50] relative">
      {/* Close icon */}
      <Link href="/salesrep">
        <button className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-gray-800">
          <AiOutlineClose />
        </button>
      </Link>

      <h1 className="text-3xl font-semibold mb-6">Orders</h1>

      {/* Create Order Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingOrderId ? "Edit Order" : "Create New Order"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="clientName"
            value={newOrder.clientName}
            onChange={handleChange}
            placeholder="Client Name"
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="product"
            value={newOrder.product}
            onChange={handleChange}
            placeholder="Product"
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="address"
            value={newOrder.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          onClick={handleAddOrUpdateOrder}
          className="mt-4 flex items-center space-x-2 bg-[#A97C50] text-white px-4 py-2 rounded hover:bg-[#91653f]"
        >
          <AiOutlinePlus /> <span>{editingOrderId ? "Update Order" : "Create Order"}</span>
        </button>
      </div>

      {/* Existing Orders */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Existing Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="p-3 border rounded shadow-sm hover:bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <p><strong>Client:</strong> {order.clientName}</p>
                  <p><strong>Product:</strong> {order.product}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                </div>
                <div className="flex gap-3">
                 
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
