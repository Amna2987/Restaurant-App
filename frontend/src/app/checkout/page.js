"use client";

import { useProductContext } from "@/context/ProductContext";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function CheckoutPage() {
  
  const {userCart} = useProductContext()
  console.log('cart items',userCart);
  

  // 💰 Grand Total
  const grandTotal = useMemo(() => {
    return userCart
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2);
  }, [userCart]);

  if (userCart.length === 0){
    return <div className="min-h-screen flex justify-center items-center pt-30 bg-black text-white px-6 py-12">
       <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          No Item In Cart
        </h1>
    </div>
  }

  return (
    <div className="min-h-screen pt-30 bg-black text-white px-6 py-12">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 🧾 ORDER DETAILS */}
          <div className="md:col-span-2 space-y-6">
            
            {userCart.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>
                  <span className="text-orange-400 font-bold">
                    ${item.price}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-1">
                  Variation: {item.variation}
                </p>

                {item.addons.length > 0 && (
                  <p className="text-sm text-gray-400">
                    Addons: {item.addons.join(", ")}
                  </p>
                )}

                <p className="text-sm text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* 💳 SUMMARY */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 h-fit">
            
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            {/* Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${grandTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$2.00</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>$1.50</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between mt-4 border-t border-gray-700 pt-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-400">
                ${(Number(grandTotal) + 3.5).toFixed(2)}
              </span>
            </div>

            {/* Button */}
            <Link href='/payment'>
            <button className="w-full mt-6 bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-xl font-semibold text-lg transition">
              Place Order
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}