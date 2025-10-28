"use client";
import Link from "next/link";
import useCartStore from "../store/cartStore";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useState } from "react";

export default function ProductCard({ product, featured }) {
  const { addToCart } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <FiStar className="text-sm" />
            <span>TOP RATED</span>
          </div>
        </div>
      )}

      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
        onClick={handleLike}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <FiHeart
          className={`text-lg ${
            isLiked
              ? "fill-red-500 text-red-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        />
      </motion.button>

      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-2">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-[56px]">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <FiStar className="text-yellow-500 fill-yellow-500 text-sm" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {product.rating?.rate}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.rating?.count} reviews)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${product.price}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all"
          >
            <FiShoppingCart className="text-lg" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
