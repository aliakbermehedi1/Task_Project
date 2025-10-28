"use client";
import useCartStore from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const [confirmItem, setConfirmItem] = useState(null); // 👈 For confirmation modal

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsCheckingOut(false);
    closeCart();
    toast.success("Order Successfully");
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      setConfirmItem(item); // 👈 open modal
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const confirmRemove = () => {
    if (confirmItem) {
      removeFromCart(confirmItem.id);
      console.log("Item removed from cart 🗑️");
      setConfirmItem(null);
    }
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
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-gradient-to-b from-gray-50/95 via-white/90 to-gray-100/80 dark:from-gray-900/95 dark:via-gray-950/90 dark:to-gray-900/80 shadow-[0_0_40px_-10px_rgba(0,0,0,0.4)] z-50 flex flex-col border-l border-gray-200/40 dark:border-gray-700/40 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md"
                >
                  <FiShoppingBag className="text-white text-xl" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    Your Cart
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FiX className="text-2xl" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <FiShoppingBag className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Add something to make it happy 😊
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={closeCart}
                        className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                      >
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                          whileHover={{ scale: 1.05 }}
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`} onClick={closeCart}>
                          <h3 className="font-semibold text-sm dark:text-white line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                          ৳{item.price}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDecrease(item)}
                              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            >
                              <FiMinus size={14} />
                            </motion.button>

                            <span className="w-8 text-center font-semibold dark:text-white">
                              {item.quantity}
                            </span>

                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            >
                              <FiPlus size={14} />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              removeFromCart(item.id);
                              toast.success("Item removed 🗑️");
                            }}
                            className="text-red-500 hover:text-red-600 p-2 transition"
                          >
                            <FiTrash2 />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold dark:text-white">
                      ৳{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Tax (10%)</span>
                    <span className="font-semibold dark:text-white">
                      ৳{(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300 dark:border-gray-600">
                    <span className="dark:text-white">Total</span>
                    <span className="text-green-600 dark:text-green-400">
                      ৳{(getTotalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-teal-500 hover:shadow-lg hover:shadow-green-500/30 transition-all ${
                    isCheckingOut ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Checkout"
                  )}
                </motion.button>

                <button
                  onClick={() => {
                    clearCart();
                    toast.info("Cart cleared 🧺");
                  }}
                  className="w-full text-red-500 dark:text-red-400 text-sm font-medium hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>

          {/* 🧾 Confirmation Modal */}
          <AnimatePresence>
            {confirmItem && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-[60]"
                  onClick={() => setConfirmItem(null)}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="fixed z-[70] inset-0 flex items-center justify-center"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-80 text-center border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                      Remove Item?
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Do you really want to remove{" "}
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        “{confirmItem.title.slice(0, 20)}...”
                      </span>{" "}
                      from your cart?
                    </p>

                    <div className="flex justify-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConfirmItem(null)}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={confirmRemove}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
