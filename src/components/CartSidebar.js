"use client";
import useCartStore from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

export default function CartSidebar() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsCheckingOut(false);
    closeCart();
    alert("Checkout completed successfully! 🎉");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiShoppingBag className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX className="text-2xl" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <FiShoppingBag className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Add some products to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 relative group"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={closeCart}
                        className="w-20 h-20 flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`} onClick={closeCart}>
                          <h3 className="font-semibold text-sm dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                          ${item.price}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FiMinus className="text-sm" />
                            </motion.button>
                            <span className="w-8 text-center font-semibold dark:text-white">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FiPlus className="text-sm" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <FiTrash2 />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-bold text-lg dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-semibold dark:text-white">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax (10%)
                    </span>
                    <span className="font-semibold dark:text-white">
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                    <span className="dark:text-white">Total</span>
                    <span className="text-green-600 dark:text-green-400">
                      ${(getTotalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all ${
                    isCheckingOut ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
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
                      Processing...
                    </span>
                  ) : (
                    "Checkout"
                  )}
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full text-red-600 dark:text-red-400 py-2 text-sm font-medium hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
