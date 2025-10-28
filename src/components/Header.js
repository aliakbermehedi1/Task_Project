"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../store/cartStore";
import SearchBar from "./SearchBar";
import Link from "next/link";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";

// ✅ Import Google Font (Galada)
import { Galada } from "next/font/google";
const galada = Galada({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  const { getTotalItems, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = getTotalItems();

  //Blink animation when cart count changes
  useEffect(() => {
    if (mounted) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemCount]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black/95 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-black shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`${galada.className} text-4xl font-bold select-none bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-400`}
              style={{
                letterSpacing: "-0.5px",
                textShadow:
                  "0 2px 5px rgba(0,0,0,0.25), 0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              কেনাকাটা
            </motion.span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Fullscreen */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullScreen}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Fullscreen"
            >
              {isFullScreen ? (
                <FiMinimize2 className="text-xl text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMaximize2 className="text-xl text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <BsSunFill className="text-lg text-gray-300" />
              ) : (
                <BsMoonStarsFill className="text-lg text-gray-700" />
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md transition flex items-center justify-center"
              aria-label="Open Cart"
              animate={
                animateCart
                  ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0px #000",
                        "0 0 10px #00A8FF",
                        "0 0 0px #000",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <FiShoppingCart className="text-2xl text-gray-800 dark:text-gray-200" />
              {mounted && cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-semibold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 px-4">
                <SearchBar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
