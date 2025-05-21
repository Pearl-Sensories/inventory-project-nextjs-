"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map((item) => ({
      id: item.id,
      name: item.name || item.title || "Unnamed Product",
      image: item.image || "/placeholder.jpg",
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity) || 1,
    }));
    console.log("Loaded cart:", initializedCart);
    setCart(initializedCart);
  }, []);

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const parsedQuantity = parseInt(quantity) || 1;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: parsedQuantity } : item
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleAddToCart = (product) => {
    const normalizedProduct = {
      id: product.id,
      name: product.name || product.title || "Unnamed Product",
      image: product.image || "/placeholder.jpg",
      price: parseFloat(product.price) || 0,
      quantity: 1,
    };

    const existingItem = cart.find((item) => item.id === normalizedProduct.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === normalizedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, normalizedProduct];
    }

    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCart([]);
    localStorage.removeItem("cart");
    alert("Checkout successful! Your cart is now empty.");
    setFormData({ name: "", email: "", address: "" });
    setShowCheckoutForm(false);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-6 py-10 bg-[#F9F9F6] min-h-screen">
      <h1 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-8">
        Your Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center bg-white rounded-lg shadow p-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium text-[#3E4E50]">
                  {item.name}
                </h2>
                <p className="text-[#A97C50] font-semibold">
                  £{item.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="text-sm">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Subtotal: £{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#6C4F3D]">
            Order Summary
          </h3>
          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Price:</span>
            <span className="font-semibold text-[#3E4E50]">
              £{total.toFixed(2)}
            </span>
          </div>

          <Link href="/checkout">
            <button
              onClick={handleCheckout}
              className="w-full bg-[#A97C50] text-white py-2 rounded-lg hover:bg-[#916741] transition"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
