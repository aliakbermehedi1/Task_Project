"use client";

import useCartStore from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to see them here.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsCheckingOut(false);
    alert("Checkout completed successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="ml-4 flex-1">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold hover:text-blue-600">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600">${item.price}</p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors ${
              isCheckingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>

          <button
            onClick={clearCart}
            className="w-full bg-red-600 text-white py-3 rounded-lg mt-3 hover:bg-red-700 transition-colors"
          >
            Clear Cart
          </button>

          <Link
            href="/"
            className="block text-center text-blue-600 mt-4 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
