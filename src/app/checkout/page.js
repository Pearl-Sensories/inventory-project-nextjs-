"use client";

import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [cart, setCart] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(true);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Debugging: Check the structure of the cart
    console.log("Cart items:", cart);

    // Create an order object
    const newOrder = {
      id: Date.now(), // Unique ID for the order
      items: cart, // Include cart items
      customer: formData, // Include customer details
      total: cart.reduce(
        (acc, item) => acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
        0
      ), // Calculate total price
      date: new Date().toLocaleString(), // Add a timestamp
    };

    // Save the order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear the cart
    setCart([]);
    localStorage.removeItem("cart");

    // Optionally, display a success message
    alert("Checkout successful! Your order has been placed.");

    // Reset the form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      zip: "",
    });
    setShowCheckoutForm(false);
  };

  return (
    <section className="bg-[#F9F9F6] min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold font-serif text-[#6C4F3D] mb-6">
          Shipping Information
        </h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm">Zip/Postal Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-[#A97C50] text-white font-medium py-2 rounded hover:bg-[#8c6239] transition duration-300"
          >
            Confirm & Continue
          </button>
        </form>
      </div>
    </section>
  );
}
