// app/wishlist/page.tsx
"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F6] flex flex-col items-center py-12 px-4">
      {/* Back Button */}
      <Link href="/" className="flex items-center text-[#6C4F3D] mb-8 hover:text-[#A97C50]">
        <FiArrowLeft className="mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-serif font-bold text-[#3E4E50] mb-6">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-lg text-[#6C4F3D]">
          Your favorite furniture will show up here. Start exploring and add some items!
        </p>
      ) : (
        <ul>
          {wishlist.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
