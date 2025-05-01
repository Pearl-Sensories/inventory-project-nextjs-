"use client";

import Image from "next/image";

const lowStockItems = [
  {
    id: 1,
    name: "Walnut Wood Bed Frame",
    image: "/card5.png",
    stock: 3,
  },
  {
    id: 2,
    name: "Slate Gray Fabric Sofa",
    image: "/sofa1.png",
    stock: 2,
  },
  {
    id: 3,
    name: "Caramel Lounge Chair",
    image: "/sofa3.png",
    stock: 1,
  },
];

export default function LowStockPage() {
  return (
    <section className="bg-[#F9F9F6] min-h-screen py-16 px-6">
      <h2 className="text-3xl md:text-4xl text-center font-serif font-semibold text-[#6C4F3D] mb-12">
        Low Stock Alerts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden group transition-transform hover:scale-[1.02]"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold font-serif text-[#6C4F3D] mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-red-600 font-medium">
                Only {item.stock} left in stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

