"use client";

import { useEffect, useState } from "react";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const local = JSON.parse(localStorage.getItem("products")) || [];

        const res = await fetch("/api/products", { cache: "no-store" });

        let api = [];
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          api = await res.json();
        }

        const allProducts = [...api, ...local];
        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to load products", err);
        const localFallback = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(localFallback);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllProducts;
