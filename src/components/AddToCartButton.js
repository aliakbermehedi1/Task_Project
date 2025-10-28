"use client";

import useCartStore from "../store/cartStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiCheck } from "react-icons/fi";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAdding(false);
    setIsAdded(true);

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={`relative w-full overflow-hidden rounded-xl py-5 px-8 text-white font-bold text-lg shadow-lg transition-all ${
        isAdded
          ? "bg-gradient-to-r from-green-600 to-green-500"
          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl"
      } ${isAdding || isAdded ? "cursor-not-allowed" : ""}`}
    >
      {/* Animated background */}
      {isAdding && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      <span className="relative flex items-center justify-center space-x-3">
        {isAdding ? (
          <>
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Adding to Cart...</span>
          </>
        ) : isAdded ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <FiCheck className="text-2xl" />
            </motion.div>
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <FiShoppingCart className="text-2xl" />
            <span>Add to Cart</span>
          </>
        )}
      </span>
    </motion.button>
  );
}
