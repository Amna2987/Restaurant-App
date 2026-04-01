"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const [openModal, setOpenModal] = useState(false);
    const [mode, setMode] = useState("login");

    const { user, registerUser, loginUser, error, logout } = useAuth();

    const handleOpen = (type) => {
        setMode(type);
        setOpenModal(true);
    };

    console.log(user);


    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent"
                    >
                        FlavorFiesta
                    </motion.h1>

                    {/* Menu */}
                    <div className="flex items-center gap-6 text-white">
                        <Link href='/'>
                            <button
                                className=""
                            >
                                Home
                            </button>
                        </Link>
                        <Link href='/checkout'>
                            <button
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 rounded-full text-black font-semibold hover:scale-105 transition duration-300"
                            >
                                Cart
                            </button>
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-orange-400">
                                    Hi, {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="hover:text-orange-400 transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6 text-white">
                                <button
                                    onClick={() => handleOpen("login")}
                                    className="hover:text-orange-400 transition duration-300"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleOpen("signup")}
                                    className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 rounded-full text-black font-semibold hover:scale-105 transition duration-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {openModal && (
                <AuthModal
                    mode={mode}
                    setMode={setMode}
                    onClose={() => {setOpenModal(false)
                        setError("")}
                    }
                    
                />
            )}
        </>
    );
}