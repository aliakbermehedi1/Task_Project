"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";
import HeroSlider from "@/components/HeroSlider";
import { findTopProducts } from "@/utils/topProducts";
import { motion } from "framer-motion";
import { FiTrendingUp, FiShoppingBag, FiStar } from "react-icons/fi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading Amazing Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const topProducts = findTopProducts(products);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Slider */}
      <HeroSlider>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-[380px] max-h-[600px] overflow-y-auto border border-white/20"
        >
          {/* Stats Section (small cards) */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white flex justify-between items-center">
              <span>Total</span>
              <strong className="text-2xl">{products.length}</strong>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white flex justify-between items-center">
              <span>Top Rated</span>
              <strong className="text-2xl">{topProducts.length}</strong>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white flex justify-between items-center">
              <span>Categories</span>
              <strong className="text-2xl">
                {[...new Set(products.map((p) => p.category))].length}
              </strong>
            </div>
          </div>

          {/* Compact Search Filter */}
          <SearchFilter products={products} onFilter={handleFilter} />
        </motion.div>
      </HeroSlider>
      <div className="container mx-auto px-4 py-12">
        {/* Top Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full mb-4"
            >
              <FiStar className="animate-pulse" />
              <span className="font-semibold">Featured Collection</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Top Rated Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Handpicked selection of our best products based on customer
              ratings and value
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ProductCard product={product} featured />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore All Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
