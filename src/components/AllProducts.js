"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import useCartStore from "@/store/cartStore";

export default function AllProducts({ products = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6); // 👈 initially show 6
  const addToCart = useCartStore((state) => state.addToCart);

  const categories = useMemo(() => {
    const allCats = ["All", ...new Set(products.map((p) => p.category))];
    return allCats;
  }, [products]);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const visibleProducts = filtered.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10); // 👈 load 10 more each click
  };

  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-950 rounded-3xl shadow-inner">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          🛒 Our Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Browse by category and find your best deal!
        </p>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* LEFT: Category List */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/4 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 h-fit"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2">
            🧭 Categories
          </h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <motion.li
                key={cat}
                whileHover={{ scale: 1.03 }}
                className={`cursor-pointer px-4 py-2 rounded-lg text-base font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/40"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6); // 👈 reset when category changes
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* RIGHT: Products Grid */}
        <motion.div
          layout
          className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {visibleProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">😕</div>
              No products found in this category
            </div>
          ) : (
            visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100 dark:border-gray-800"
              >
                {/* 🖼 Product Image */}
                <Link
                  href={`/products/${product.id}`}
                  className="block relative w-full h-56 bg-gray-50 dark:bg-gray-800 z-10"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>

                {/* Product Details */}
                <div className="relative z-20 p-5 space-y-2">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-2 h-[40px] hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center text-sm text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`${
                          index < Math.round(product.rating?.rate || 0)
                            ? "fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      ({product.rating?.count || 0})
                    </span>
                  </div>

                  {/* Price + Cart Button */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        ৳{product.price}
                      </p>
                      <p className="text-sm line-through text-gray-400">
                        ৳{(product.price * 1.2).toFixed(2)}
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="relative z-30 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-all shadow-md cursor-pointer"
                    >
                      <FiShoppingCart size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* ✅ Show More Button */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "#22c55e",
              color: "#22c55e",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowMore}
            className="px-8 py-3 border border-white/30 text-white text-lg font-semibold rounded-full transition-all duration-300 bg-transparent hover:border-green-500"
          >
            Show More
          </motion.button>
        </div>
      )}
    </section>
  );
}
