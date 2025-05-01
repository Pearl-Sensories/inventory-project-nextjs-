"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    image: "", // Will be a base64 string
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIndex = parseInt(searchParams.get("edit"), 10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    if (editIndex >= 0 && stored[editIndex]) {
      const product = stored[editIndex];
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        inStock: product.inStock || "",
        image: product.image || "",
      });
    }
  }, [editIndex]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const stored = JSON.parse(localStorage.getItem("products")) || [];

      // Skip adding image if storage size exceeds 5MB
      const MAX_STORAGE_BYTES = 5 * 1024 * 1024;
      const temp = [...stored];
      temp[editIndex] = { ...formData };
      const size = new Blob([JSON.stringify(temp)]).size;

      if (size > MAX_STORAGE_BYTES) {
        alert("Storage quota exceeded. Image will not be saved.");
        temp[editIndex].image = "";
      }

      localStorage.setItem("products", JSON.stringify(temp));
      router.push("/add/editproducts");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] flex items-center justify-center text-[#3E4E50] p-4 relative">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-2xl shadow space-y-4 relative"
        encType="multipart/form-data"
      >
        <Link href="/add/editproducts">
          <IoClose className="absolute top-4 right-4 text-2xl text-[#6C4F3D] hover:text-[#4e392b] cursor-pointer" />
        </Link>

        <h2 className="text-2xl font-bold text-[#6C4F3D] mb-4">Edit Product</h2>

        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">In Stock</label>
          <input
            type="text"
            name="inStock"
            value={formData.inStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 bg-white"
          />
        </div>

        <button
          type="submit"
          className="bg-[#6C4F3D] text-white px-4 py-2 rounded hover:bg-[#5a3f31] transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
