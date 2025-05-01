"use client";

import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const mattresses = [
  {
    id: 1,
    image: "/mattress1.png",
    title: "Memory Foam Mattress",
    price: 499,
    description: "Contours to your body for unmatched pressure relief and comfort.",
    available: true,
  },
  {
    id: 2,
    image: "/mattress2.png",
    title: "Hybrid Pocket Spring Mattress",
    price: 699,
    description: "Combines responsive pocket springs with plush foam layers.",
    available: false,
  },
  {
    id: 3,
    image: "/mattress3.png",
    title: "Gel-Infused Foam Mattress",
    price: 599,
    description: "Helps regulate temperature so you can sleep cool through the night.",
    available: true,
  },
  {
    id: 4,
    image: "/mattress4.png",
    title: "Natural Latex Mattress",
    price: 749,
    description: "Eco‑friendly, bouncy support with a responsive feel.",
    available: false,
  },
  {
    id: 5,
    image: "/mattress5.png",
    title: "Pocket Spring Mattress",
    price: 799,
    description: "Individual spring support for perfect spinal alignment.",
    available: true,
  },
  {
    id: 6,
    image: "/mattress6.png",
    title: "Orthopedic Support Mattress",
    price: 549,
    description: "Designed to relieve back pain and improve posture overnight.",
    available: true,
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export default function MattressesPage() {
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
        Our Mattresses Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {mattresses.map((mattress) => (
          <div
            key={mattress.id} // Ensure the key is unique
            className="relative group overflow-hidden rounded-lg shadow-md bg-white transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={mattress.image}
              alt={mattress.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />

            {/* Hover Buttons */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() => handleAddToWishlist(mattress)}
                className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] text-white px-4 py-2 rounded-full mr-2 transition-colors"
              >
                <FiHeart className="mr-1" /> Wishlist
              </button>
              <button
                onClick={() => handleAddToCart(mattress)}
                className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] text-white px-4 py-2 rounded-full transition-colors"
              >
                <FiShoppingCart className="mr-1" /> Add to Cart
              </button>
            </div>

            {/* Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#3E4E50]">
                {mattress.title}
              </h3>
              <p className="mt-2 text-sm text-[#6C4F3D]">
                {mattress.description}
              </p>
              <p className="mt-2 text-lg font-semibold text-[#A97C50]">
                {formatPrice(mattress.price)}
              </p>

              {/* Availability */}
              <div className="mt-4 text-sm text-[#3E4E50] inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={mattress.available}
                  readOnly
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                <span>
                  {mattress.available ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
