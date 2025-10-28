"use client";

import useCartStore from "@/store/cartStore";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Your Cart is Empty 🛒
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium shadow hover:shadow-lg transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsCheckingOut(false);
    alert("✅ Checkout completed successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Product Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="96px"
                  className="object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="ml-4 flex-1">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-green-600 transition">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    –
                  </button>
                  <span className="mx-3 w-8 text-center text-gray-800 dark:text-gray-200 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right font-semibold text-gray-900 dark:text-gray-100">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-2 mb-4 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 dark:text-green-400">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
            <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all ${
              isCheckingOut ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </motion.button>

          <button
            onClick={clearCart}
            className="w-full bg-red-600 text-white py-3 rounded-lg mt-3 font-medium hover:bg-red-700 transition"
          >
            Clear Cart
          </button>

          <Link
            href="/"
            className="block text-center text-green-600 mt-4 hover:text-green-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
