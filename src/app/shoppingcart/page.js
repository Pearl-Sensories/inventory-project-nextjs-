"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function shoppingcart() {
  const [cart, setCart] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map((item) => ({
      ...item,
      price: parseFloat(item.price) || 0, // Ensure price is a valid number
      quantity: parseInt(item.quantity) || 1, // Ensure quantity is a valid number
    }));
    console.log("Loaded cart:", initializedCart); // Debugging
    setCart(initializedCart);
  }, []);

  useEffect(() => {
    console.log("Cart updated:", cart); // Debugging
  }, [cart]);

  const handleQuantityChange = (id, quantity) => {
    const parsedQuantity = parseInt(quantity) || 1; // Ensure quantity is a valid number
    setCart((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: parsedQuantity } : item
      )
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: parsedQuantity } : item
        )
      )
    );
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product) => {
    console.log("Adding product to cart:", product); // Debugging
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [
          ...prevCart,
          {
            ...product,
            price: parseFloat(product.price) || 0, // Ensure price is a valid number
            quantity: 1,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Clear the cart
    setCart([]);
    localStorage.removeItem("cart");

    // Optionally, display a success message
    alert("Checkout successful! Your cart is now empty.");

    // Reset the form and hide the checkout form
    setFormData({ name: "", email: "", address: "" });
    setShowCheckoutForm(false);
  };

  const total = cart.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
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
              key={`${item.id}-${index}`} // Ensure the key is unique
              className="flex items-center bg-white rounded-lg shadow p-4"
            >
              <Image
                src={item.image}
                alt={item.name || "Product image"}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium text-[#3E4E50]">
                  {item.name}
                </h2>
                <p className="text-[#A97C50] font-semibold">£{item.price}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="text-sm">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Subtotal: £{((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
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
            <span>{cart.length}</span>
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
