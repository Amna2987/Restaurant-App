"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({ mode, setMode, onClose }) {

   const { user,registerUser,loginUser,error,setError,googleUserLogin  } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword:''
  });


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData,[name]:value})
    console.log(formData);
     if (error) setError(""); // ✅ clear on typing
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  let success = false;

  if (mode === "login") {
    success = await loginUser(formData);
  } else {
    success = await registerUser(formData);
  }

  // ✅ close ONLY if success
  if (success) {
    onClose();
  }
};
  const submitGoogleUser = async (e) => {
  e.preventDefault();
  try {
    googleUserLogin()
  } catch (err) {
    console.log(err);

  }
};
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900 text-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          {/* Close */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          {error && (
  <div className="bg-red-500/20 mb-2 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
    {error}
  </div>
)}

          {/* Form */}
          <form className="space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition"
            />

            {mode === "signup" && (
              <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition"
            />
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-3 rounded-lg hover:scale-105 transition duration-300"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
            <button
              type="submit"
              onClick={submitGoogleUser}
              className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-black font-semibold py-3 rounded-lg hover:scale-105 transition duration-300"
            >
              Signin with Google
            </button>
          </form>

          {/* Switch Mode */}
          <p className="text-center text-gray-400 mt-6">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="text-orange-400 cursor-pointer hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}