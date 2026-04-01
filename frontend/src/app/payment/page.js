"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useProductContext } from "@/context/ProductContext";
import api from "@/api/api";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const stripePromise = loadStripe("pk_test_xxx");

export default function PaymentPage() {
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🧾 CUSTOMER FORM STATE
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const {userCart} = useProductContext()

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log('form',form);
  

 const handleOrder = async () => {
  if (!form.name || !form.phone || !form.address) {
    // alert("Please fill all fields");
    toast.warn("Please fill all fields to place order")
    return;
  }

  setLoading(true);

  const formData = {
    items: userCart,
    customerName: form.name,
    address: form.address,
    phone: form.phone,
    paymentMethod: method,
  };

  try {
    const res = await api.post('/orders/place-order', formData);
    const data = res.data;
    console.log('order',res.data);
    

    // 🟢 COD
    if (method === "COD") {
      // alert("Order placed successfully");
      toast.success(res.data.message)
      router.push("/success");
      return;
    }

    // 🔵 STRIPE
    if (method === "STRIPE") {
      window.location.href = data.url;
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen pt-30 bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Checkout
        </h1>

        {/* 🧾 CUSTOMER FORM */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 space-y-4">

          <h2 className="text-xl font-semibold text-orange-400">
            Customer Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 outline-none"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-500 outline-none"
          />
        </div>

        {/* 💳 PAYMENT OPTIONS */}
        <div className="mt-6 space-y-4">

          <div
            onClick={() => setMethod("COD")}
            className={`p-5 rounded-xl border cursor-pointer transition ${
              method === "COD"
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-700"
            }`}
          >
            <h2 className="font-semibold">Cash on Delivery</h2>
            <p className="text-sm text-gray-400">
              Pay when your order arrives
            </p>
          </div>

          <div
            onClick={() => setMethod("STRIPE")}
            className={`p-5 rounded-xl border cursor-pointer transition ${
              method === "STRIPE"
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-700"
            }`}
          >
            <h2 className="font-semibold">Credit / Debit Card</h2>
            <p className="text-sm text-gray-400">
              Pay securely with Stripe
            </p>
          </div>
        </div>

        {/* 🚀 BUTTON */}
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-xl font-semibold text-lg transition"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}