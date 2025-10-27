"use client";
import Link from "next/link";
import useCartStore from "../store/cartStore";
import { useLayoutEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = getTotalItems();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Saimon Shop
        </Link>

        <nav className="flex items-center space-x-4">
          <ThemeToggle />

          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/cart"
            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Cart</span>
            {mounted && cartItemCount > 0 && (
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
