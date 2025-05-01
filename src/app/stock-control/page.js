"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1, name: "Bed Frame", image: "/image6.png", stock: 12 },
  { id: 2, name: "Sofa Set", image: "/image5.png", stock: 8 },
  { id: 3, name: "Mattress", image: "/image3.png", stock: 5 },
  { id: 4, name: "Dining Table", image: "/image2.png", stock: 20 },
  { id: 5, name: "Chair", image: "/image4.png", stock: 2 },
];

export default function StockControl() {
  const [stockLevels, setStockLevels] = useState(products);

  const handleStockUpdate = (id, newStock) => {
    const updatedStock = stockLevels.map((product) =>
      product.id === id ? { ...product, stock: newStock } : product
    );
    setStockLevels(updatedStock);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] p-6">
      <h2 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-6">
        Stock Control
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stockLevels.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-[#3E4E50]">{product.name}</h3>
            <p className="text-sm text-[#6C4F3D]">Stock: {product.stock}</p>

            <div className="mt-4 flex space-x-4">
              <input
                type="number"
                min="0"
                value={product.stock}
                onChange={(e) =>
                  handleStockUpdate(product.id, parseInt(e.target.value))
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Update stock"
              />
              <button
                onClick={() => handleStockUpdate(product.id, 0)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
