"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center max-w-lg">

        {/* 🔥 404 Text */}
        <h1 className="text-7xl font-extrabold text-orange-500 mb-4">
          404
        </h1>

        {/* ❌ Message */}
        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* 🚀 Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-xl font-semibold transition"
          >
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>

        {/* 🍔 Extra Branding Touch */}
        <p className="mt-10 text-sm text-gray-600">
          Hungry? Let’s get you back to the menu 🍔
        </p>
      </div>
    </div>
  );
}