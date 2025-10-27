"use client";
import Link from "next/link";
import useCartStore from "../store/cartStore";

export default function Header() {
  const { getTotalItems } = useCartStore();

  // Simple solution - let React handle the hydration
  // This might show warning but will work correctly
  const cartItemCount = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Saimon Shop
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/cart"
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
          >
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span
                key={cartItemCount} // Add key to force re-render
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
