import React from 'react'

export default function MenuItem({ item, onAddClick }) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition">
      
      <img src={item.image} className="h-48 w-full object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {item.name}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-orange-400 font-bold">
            ${item.basePrice}
          </span>

          <button
            onClick={onAddClick} // ⭐ HERE
            className="bg-orange-500 text-black px-4 py-1 rounded hover:bg-orange-400 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
