"use client";

import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { useProductContext } from "@/context/ProductContext";
import { useState, useMemo } from "react";

export default function OrderModal({ item, onClose }) {

    const { user } = useAuth();
    const {addToCart} = useProductContext()

    const [selectedVariation, setSelectedVariation] = useState(
        item.variations?.[0]?.name || ""
    );
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [qty, setQty] = useState(1);

    const totalPrice = useMemo(() => {
        let price = item.basePrice;

        const selectedVar = item.variations.find(
            (v) => v.name === selectedVariation
        );
        if (selectedVar) price += selectedVar.price;

        selectedAddons.forEach((addonName) => {
            const addon = item.addons.find((a) => a.name === addonName);
            if (addon) price += addon.price;
        });

        return (price * qty).toFixed(2);
    }, [selectedVariation, selectedAddons, qty, item]);

    const toggleAddon = (name) => {
        setSelectedAddons((prev) =>
            prev.includes(name)
                ? prev.filter((a) => a !== name)
                : [...prev, name]
        );
        console.log('selected addons', selectedAddons);

    };
    console.log('selected variation', selectedVariation);
    

    const handleAdd = () => {
        console.log('add');

        if(!item._id) {
            console.log('no user')
        }
        else{
            const cartItem={
                userId:user.userId,
                itemId:item._id,
                name:item.name,
                variation:selectedVariation,
                addon:selectedAddons,
                quantity: qty,
            };
            console.log('cart itm', cartItem);
            
            try {
                addToCart(cartItem)
            } catch (error) {
                console.log('cart',error);
                
            }
        }
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-end md:items-center z-50">

            {/* Modal */}
            <div className="bg-zinc-900 text-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl">

                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={item.image}
                        className="w-full h-52 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full text-sm"
                    >
                        ✕
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-5 max-h-[70vh] overflow-y-auto">

                    {/* Title */}
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {item.description}
                    </p>

                    {/* VARIATIONS */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-orange-400">
                            Choose Option
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {item.variations.map((v, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedVariation(v.name)}
                                    className={`px-4 py-2 rounded-full border text-sm transition ${selectedVariation === v.name
                                            ? "bg-orange-500 text-black border-orange-500"
                                            : "border-gray-600 text-gray-300 hover:border-orange-400"
                                        }`}
                                >
                                    {v.name} {v.price > 0 && `(+${v.price})`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ADDONS */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-orange-400">
                            Addons
                        </h3>

                        <div className="space-y-2">
                            {item.addons.map((a, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleAddon(a.name)}
                                    className={`flex justify-between items-center px-4 py-2 rounded-lg border cursor-pointer transition ${selectedAddons.includes(a.name)
                                            ? "border-orange-500 bg-orange-500/10"
                                            : "border-gray-700 hover:border-orange-400"
                                        }`}
                                >
                                    <span>{a.name}</span>
                                    <span className="text-orange-400">
                                        +${a.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center justify-between mt-6">
                        <span className="font-semibold">Quantity</span>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center"
                            >
                                -
                            </button>

                            <span className="text-lg">{qty}</span>

                            <button
                                onClick={() => setQty((q) => q + 1)}
                                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER BUTTON */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleAdd}
                        className="w-full bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-xl font-semibold text-lg transition"
                    >
                        Add to Cart • ${totalPrice}
                    </button>
                </div>
            </div>
        </div>
    );
}