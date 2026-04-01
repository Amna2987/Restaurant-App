"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import OrderModal from "./OrderModal";
import { useProductContext } from "@/context/ProductContext";

export default function MenuTabs() {
  const [active, setActive] = useState("Burgers");
  const { categories, menuItems } = useProductContext();

  const [selectedItem, setSelectedItem] = useState(null); // ⭐ NEW

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
        Our Menu
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2 rounded-full border transition ${
              active === cat
                ? "bg-orange-500 text-black"
                : "border-gray-600 text-white hover:border-orange-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {menuItems
          .filter((item) => item.category === active)
          .map((item, i) => (
            <MenuItem
              key={i}
              item={item}
              onAddClick={() => setSelectedItem(item)} // ⭐ PASS HANDLER
            />
          ))}
      </motion.div>

      {/* ⭐ MODAL */}
      {selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          // onAddToCart={(data) => {
          //   console.log("Cart Item:", data);
          // }}
        />
      )}
    </section>
  );
}