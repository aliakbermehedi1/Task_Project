"use client";

import useCartStore from "../store/cartStore";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AddToCartButton({ product }) {
  const { addToCart, items } = useCartStore();

  const handleAddToCart = () => {
    const exists = items.some((item) => item.id === product.id);

    if (exists) {
      toast.info("🛒 Already in cart!", { icon: "⚠️" });
      return;
    }

    addToCart(product);
    toast.success("✅ Added to cart!");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleAddToCart}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
    >
      <FiShoppingCart className="text-2xl" />
      <span>Add to Cart</span>
    </motion.button>
  );
}
