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

    const newOrder = {
      id: Date.now(),
      items: cart,
      customer: formData,
      total: cart.reduce(
        (acc, item) => acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
        0
      ),
      date: new Date().toLocaleString(),
      source: "checkout",
    };

    // Append order to existing orders in localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear cart
    setCart([]);
    localStorage.removeItem("cart");

    // Success
    alert("Checkout successful! Your order has been placed.");
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

  if (!showCheckoutForm) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#F9F9F6] text-[#6C4F3D]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Thank you for your order!</h2>
          <p>We’ve received your details and will begin processing your order shortly.</p>
        </div>
      </section>
    );
  }

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
