"use client";

import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md"; // Import MdClose from react-icons

const products = [
  {
    id: 1,
    name: "Walnut Queen Bed",
    image: "/bed1.png",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Caramel Sofa",
    image: "/sofa1.png",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "Slate Gray Armchair",
    image: "/card3.png",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Memory Foam Mattress",
    image: "/mattress1.png",
    status: "Low Stock",
  },
];

export default function ProductAvailability() {
  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 text-[#3E4E50] relative">
      <Link
        href="/salesrep"
        className="absolute top-6 right-6 text-3xl hover:opacity-80 transition"
      >
        <MdClose style={{ color: "#6C4F3D" }} />
      </Link>

      <h2 className="text-2xl font-bold text-[#6C4F3D] mb-6">
        Product Availability
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-4 border border-gray-100"
          >
            <div className="w-full h-40 relative mb-4">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p
              className={`text-sm font-medium px-2 py-1 rounded inline-block
              ${
                product.status === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : product.status === "Out of Stock"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {product.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
