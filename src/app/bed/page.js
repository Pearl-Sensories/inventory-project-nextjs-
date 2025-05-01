"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const products = [
  { id: 1, image: "/bed1.png", title: "Elegant Bed", price: 799, description: "Soft and comfortable with a luxurious design.", available: true },
  { id: 2, image: "/bed2.png", title: "Modern Sofa", price: 599, description: "Stylish and cozy, perfect for your living room.", available: false },
  { id: 3, image: "/bed3.png", title: "Memory Foam Mattress", price: 299, description: "Supportive and long-lasting for a great night's sleep.", available: true },
  { id: 4, image: "/bed4.png", title: "Armchair", price: 399, description: "Perfect for relaxation with a contemporary touch.", available: false },
  { id: 5, image: "/bed5.png", title: "Coffee Table", price: 149, description: "A sleek, minimalistic table for any room.", available: true },
  { id: 6, image: "/bed6.png", title: "Luxury Duvet", price: 129, description: "Experience the ultimate in comfort and warmth.", available: true },
];

export default function BedsPage() {
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
        Our Beds Collection
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
              <p className="mt-2 text-lg font-semibold text-[#A97C50]">£{product.price}</p>

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
