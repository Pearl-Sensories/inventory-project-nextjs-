"use client"; // This makes sure this page is only rendered on the client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for the App Router

const users = [
  { username: "inventoryadmin", password: "password123", role: "inventoryadmin" },
  { username: "warehouse-manager", password: "password456", role: "warehouse-manager" },
  { username: "salesrep", password: "password789", role: "salesrep" },
];

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if the component is being mounted on the client-side
    if (typeof window !== "undefined") {
      // Client-side logic here
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Store the user's role or username in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Redirect based on the user's role
      if (user.role === "inventoryadmin") {
        router.push("/inventoryadmin");
      } else if (user.role === "warehouse-manager") {
        router.push("/warehouse-manager");
      } else if (user.role === "salesrep") {
        router.push("/salesrep");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-semibold mb-4 text-center">Admin Sign-In</h1>
        <p className="text-center mb-4 text-gray-500">For admin use only</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-[#A97C50] text-white rounded-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
