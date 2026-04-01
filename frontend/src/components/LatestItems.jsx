'use client'
import { motion } from "framer-motion";

const items = [
  {
    name: "Spicy Chicken Burger",
    price: "$13",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    name: "BBQ Pizza",
    price: "$19",
    img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65"
  },
  {
    name: "Chocolate Shake",
    price: "$7",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699"
  }
];

export default function LatestItems() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Latest Dishes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 rounded-xl overflow-hidden border border-white/10"
            >
              <img
                src={item.img}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <div className="flex justify-between mt-3">
                  <span className="text-orange-400 font-bold">
                    {item.price}
                  </span>

                  <button className="bg-orange-500 text-black px-4 py-1 rounded">
                    Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}