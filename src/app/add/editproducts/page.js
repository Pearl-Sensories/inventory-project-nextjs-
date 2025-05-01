"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import Link from "next/link";

export default function AllProductsPage() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProductList(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = productList.filter((_, i) => i !== index);
    setProductList(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6 relative">
      {/* Close Icon to return to /inventoryadmin */}
      <Link href="/inventoryadmin">
        <button className="absolute top-4 right-4 text-[#6C4F3D] hover:text-[#A97C50] text-2xl">
          <FiX />
        </button>
      </Link>

      <h1 className="text-2xl font-semibold text-[#6C4F3D] mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productList.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 relative group transition-transform transform hover:scale-[1.02]"
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="rounded-xl w-full h-48 object-cover"
              />
            )}

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-[#3E4E50]">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-[#A97C50] font-semibold mt-2">
                ${product.price}
              </p>
              <p
                className={`text-sm mt-1 font-medium ${
                  product.inStock === "0" || product.inStock === "Out of Stock"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {product.inStock === "0" || product.inStock === "Out of Stock"
                  ? "Out of Stock"
                  : `${product.inStock} left`}
              </p>
            </div>

            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/edit-products?edit=${index}`}>
                <button className="bg-[#A97C50] text-white p-2 rounded-full hover:bg-[#6C4F3D]">
                  <FiEdit2 />
                </button>
              </Link>
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                onClick={() => handleDelete(index)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        <Link href="/add-new-product">
          <div className="flex flex-col items-center justify-center border-4 border-dashed border-[#A97C50] rounded-2xl h-64 cursor-pointer hover:bg-[#fcf8f4]">
            <FiPlus className="text-3xl text-[#A97C50]" />
            <p className="mt-2 text-[#6C4F3D] font-semibold">Add New Product</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
