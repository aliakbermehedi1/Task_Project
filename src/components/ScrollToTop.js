"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group focus:outline-none"
        >
          <div className="relative">
            {/* 🌀 Glowing animated aura */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500 blur-md"
            />

            {/* 💎 Main Button */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-14 h-14 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all"
            >
              <FiArrowUp className="text-white text-2xl group-hover:animate-bounce" />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
