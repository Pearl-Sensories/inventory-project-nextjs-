"use client";

import Image from "next/image";

const outOfStockItems = [
  {
    id: 1,
    name: "Modern Walnut Bed",
    image: "/bed6.png",
  },
  {
    id: 2,
    name: "Caramel Leather Sofa",
    image: "/sofa3.png",
  },
  {
    id: 3,
    name: "Slate Gray Armchair",
    image: "/card3.png",
  },
  {
    id: 4,
    name: "Walnut Dining Set",
    image: "/image4.png",
  },
];

export default function OutOfStockPage() {
  return (
    <section className="bg-[#F9F9F6] min-h-screen py-16 px-6">
      <h2 className="text-3xl md:text-4xl text-center font-serif font-semibold text-[#6C4F3D] mb-12">
        Out of Stock Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {outOfStockItems.map((item) => (
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
              <p className="text-sm text-[#A97C50] italic">Currently Unavailable</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
