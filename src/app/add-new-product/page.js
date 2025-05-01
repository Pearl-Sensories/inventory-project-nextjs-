"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddNewProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [editIndex, setEditIndex] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productStock, setProductStock] = useState("");

  useEffect(() => {
    setIsClient(true); // Ensure the page runs only on the client side
  }, []);

  useEffect(() => {
    if (!isClient) return; // Prevent useSearchParams from running during SSR

    const index = searchParams.get("edit");
    if (index !== null) {
      setEditIndex(index);

      const products = JSON.parse(localStorage.getItem("products")) || [];
      const product = products[index];
      if (product) {
        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price?.replace("$", ""));
        setProductImage(product.image);
        setProductStock(product.stock);
      }
    }
  }, [searchParams, isClient]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !productPrice || !productStock) {
      alert("Please fill in all fields.");
      return;
    }

    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice.includes("$") ? productPrice : `$${productPrice}`,
      image: productImage || "/placeholder.png",
      stock: productStock,
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (editIndex !== null && existingProducts[editIndex]) {
      existingProducts[editIndex] = newProduct;
    } else {
      existingProducts.push(newProduct);
    }

    localStorage.setItem("products", JSON.stringify(existingProducts));

    alert(`Product ${editIndex !== null ? "updated" : "added"} successfully!`);
    router.push("/add/editproducts");
  };

  if (!isClient) {
    return <div>Loading...</div>; // Render this fallback during SSR
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F6] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-[#6C4F3D] text-center mb-4">
          {editIndex !== null ? "Edit Product" : "Add a New Product"}
        </h1>

        <div>
          <label className="block text-[#6C4F3D] font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-[#6C4F3D] font-medium mb-1">
            Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-[#6C4F3D] font-medium mb-1">
            Price
          </label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-[#6C4F3D] font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {productImage && (
            <img
              src={productImage}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div>
          <label className="block text-[#6C4F3D] font-medium mb-1">
            Stock Availability
          </label>
          <input
            type="text"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-[#A97C50] text-white font-semibold rounded-md hover:bg-[#6C4F3D] transition"
        >
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
