// components/HeroSlider.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% OFF",
    description: "Discover our latest arrivals and trending styles",
    bg: "from-blue-600 to-purple-700",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
  },
  {
    id: 2,
    title: "Premium Quality Products",
    subtitle: "Best Deals Ever",
    description: "Shop now and save big on your favorite items",
    bg: "from-purple-600 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200",
  },
  {
    id: 3,
    title: "Electronics & Gadgets",
    subtitle: "Latest Tech",
    description: "Upgrade your lifestyle with cutting-edge technology",
    bg: "from-green-600 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
  },
];

export default function HeroSlider({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[750px] overflow-hidden bg-gray-900 rounded-b-[3rem] shadow-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg} opacity-80`}
          ></div>

          {/* Text Content */}
          <div className="relative z-10 h-full container mx-auto px-8 flex flex-col justify-center text-white max-w-2xl">
            <h3 className="text-white/90 uppercase font-semibold tracking-widest mb-3">
              {slides[currentSlide].subtitle}
            </h3>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {slides[currentSlide].description}
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
                Shop Now
              </button>
              <button className="border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Children (filters/stats) */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-end pr-10 z-20">
          {children}
        </div>
      )}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition"
      >
        <FiChevronLeft size={26} />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-3 rounded-full text-white hover:bg-white/30 transition"
      >
        <FiChevronRight size={26} />
      </button>
    </div>
  );
}
