"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Delicious Burgers",
    subtitle: "Freshly made with premium ingredients",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349"
  },
  {
    title: "Authentic Italian Pizza",
    subtitle: "Wood fired perfection",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    title: "Luxury Dining Experience",
    subtitle: "Taste the difference",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
  }
];

export default function HeroSlider() {
  return (
    <section className="w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[90vh] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center text-white max-w-2xl"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>

                  <p className="text-[26px] mb-8 text-gray-200">
                    {slide.subtitle}
                  </p>

                  <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
                    Order Now
                  </button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}