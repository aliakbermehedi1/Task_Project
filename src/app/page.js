"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { findTopProducts } from "@/utils/topProducts";
import { motion } from "framer-motion";
import { FiTrendingUp, FiShoppingBag, FiStar } from "react-icons/fi";
import TopDeals from "@/components/TopDeals";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🌟 PREMIUM LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Animated Circle Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-emerald-500/20 via-green-400/10 to-emerald-600/20 blur-3xl"
        />

        {/* Rotating Shopping Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiShoppingBag className="text-white text-4xl" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl sm:text-3xl font-bold mt-6 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
        >
          Loading Amazing Products
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Please wait a moment...
        </motion.p>

        {/* Progress Glow Line */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "80%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-1 mt-8 w-1/2 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 rounded-full"
        />
      </div>
    );
  }

  // ❌ ERROR SCREEN
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-4xl">😕</span>
          </motion.div>

          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ✅ MAIN PAGE
  const topProducts = findTopProducts(products);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 mx-2 md:mx-10">
      <HeroSlider />
      <TopDeals products={products} />
      <AllProducts products={products} />
    </main>
  );
}
