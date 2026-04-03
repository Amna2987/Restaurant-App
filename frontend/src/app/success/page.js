"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/ProductContext";

export default function SuccessPage() {
  const router = useRouter();

  const { setUserCart,clearCart } = useProductContext();

  useEffect(() => {
    // 🧹 Clear cart after successful order
    // setUserCart([]);
    clearCart()
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-8 text-center max-w-md w-full">

        <h1 className="text-3xl font-bold text-green-400 mb-4">
          🎉 Payment Successful!
        </h1>

        <p className="text-gray-400 mb-2">
          Your order has been placed successfully.
        </p>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-xl font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}