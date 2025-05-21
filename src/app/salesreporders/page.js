"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    product: "",
    quantity: 1,
    price: "",
    address: "",
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the input field is for quantity or price, then ensure the value is a valid number.
    if (name === "quantity" || name === "price") {
      const numericValue = value === "" ? "" : parseFloat(value); // Allow empty string for clearing
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? "" : numericValue, // Only set valid numbers, else leave as empty string
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    const { price, quantity, product, clientName, address } = formData;

    if (!price || !quantity || !clientName || !product || !address) {
      // Optional: You can add validation to handle incomplete forms.
      console.log("All fields must be filled");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: {
        id: clientName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        fullName: clientName,
        address: address,
      },
      items: [
        {
          name: product,
          quantity: quantity,
          price: price,
        },
      ],
      total: quantity * price,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    // Save order
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Save customer (if new)
    const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    const customerExists = storedCustomers.some(
      (c) =>
        c.name === newOrder.customer.fullName &&
        c.address === newOrder.customer.address
    );

    if (!customerExists) {
      const newCustomer = {
        id: newOrder.customer.id,
        name: newOrder.customer.fullName,
        address: newOrder.customer.address,
      };
      const updatedCustomers = [...storedCustomers, newCustomer];
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    }

    // Reset form
    setFormData({
      clientName: "",
      product: "",
      quantity: 1,
      price: "",
      address: "",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/salesrep">
        <button className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-gray-800 mt-20">
          <AiOutlineClose />
        </button>
      </Link>

      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <form
        onSubmit={handleAddOrder}
        className="space-y-4 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleInputChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={formData.product}
          onChange={handleInputChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity || ""} // Ensures an empty string if no value is entered
          onChange={handleInputChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price || ""} // Ensures an empty string if no value is entered
          onChange={handleInputChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#A97C50] text-white px-4 py-2 rounded hover:bg-[#8c6239]"
        >
          Add Order
        </button>
      </form>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded bg-white">
              <p className="text-sm text-gray-500">Order Date: {order.date}</p>
              <p className="font-medium">Client: {order.customer?.fullName}</p>
              <ul className="text-sm list-disc ml-5 mt-1">
                <li>Product: {order.items?.[0]?.name}</li>
                <li>Quantity: {order.items?.[0]?.quantity}</li>
                <li>
                  Price: $
                  {typeof order.items?.[0]?.price === "number"
                    ? order.items[0].price.toFixed(2)
                    : "N/A"}
                </li>

                <li>Shipping Address: {order.customer?.address}</li>
              </ul>
              <p className="font-semibold mt-2">
                Total: $
                {typeof order.total === "number"
                  ? order.total.toFixed(2)
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
