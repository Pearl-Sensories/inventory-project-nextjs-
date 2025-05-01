"use client"; // Ensure client-side only

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem("user");

    // Redirect to the sign-in page after logout
    router.push("/signin");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-xl font-semibold mb-4">Logging out...</h1>
        <p>Please wait while we log you out...</p>
      </div>
    </div>
  );
}
