"use client";

import { useState } from "react";
import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const products = [
  { id: 1, image: "/sofa1.png", title: "Luxury Sofa", price: 899, description: "Soft cushions and an elegant design.", available: true },
  { id: 2, image: "/sofa2.png", title: "Modern Sofa Set", price: 1199, description: "Stylish and comfortable, perfect for any living room.", available: false },
  { id: 3, image: "/sofa3.png", title: "Recliner Sofa", price: 799, description: "Ultimate comfort with reclining features.", available: true },
  { id: 4, image: "/sofa4.png", title: "Leather Sofa", price: 1499, description: "A premium leather sofa with a timeless design.", available: false },
  { id: 5, image: "/sofa5.png", title: "Sectional Sofa", price: 1299, description: "Spacious and versatile sectional, ideal for large families.", available: true },
  { id: 6, image: "/sofa6.png", title: "Convertible Sofa", price: 749, description: "Space-saving convertible design for small spaces.", available: true },
];

// Utility function to format prices
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export default function Sofas() {
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} has been added to your cart.`);
  };

  const handleAddToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert(`${product.title} has been added to your wishlist.`);
  };

  return (
    <section className="bg-[#F9F9F6] px-6 py-16">
      <h2 className="text-3xl md:text-4xl text-center font-serif font-semibold text-[#6C4F3D] mb-10">
        Our Sofas Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-md bg-white">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover Buttons */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 text-white">
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] w-40 px-4 py-2 rounded-full"
                >
                  <FiHeart className="mr-2" /> Add to Wishlist
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] w-40 px-4 py-2 rounded-full"
                >
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#3E4E50]">{product.title}</h3>
              <p className="mt-2 text-sm text-[#6C4F3D]">{product.description}</p>
              <p className="mt-2 text-lg font-semibold text-[#A97C50]">{formatPrice(product.price)}</p>

              {/* Availability */}
              <div className="mt-4 text-sm text-[#3E4E50]">
                <label className="inline-flex items-center space-x-2">
                  <input type="checkbox" checked={product.available} readOnly className="form-checkbox h-5 w-5 text-green-500" />
                  <span>{product.available ? "In Stock" : "Out of Stock"}</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
