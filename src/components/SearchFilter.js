"use client";
import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

export default function SearchFilter({ products, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const priceRange = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const filterProducts = useCallback(
    (search, category, min, max) => {
      let filtered = products;

      if (search) {
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      if (min) {
        filtered = filtered.filter(
          (product) => product.price >= parseFloat(min)
        );
      }

      if (max) {
        filtered = filtered.filter(
          (product) => product.price <= parseFloat(max)
        );
      }

      onFilter(filtered);
    },
    [products, onFilter]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value, selectedCategory, minPrice, maxPrice);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(searchTerm, value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    filterProducts(searchTerm, selectedCategory, value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    filterProducts(searchTerm, selectedCategory, minPrice, value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    onFilter(products);
  };

  const hasActiveFilters =
    searchTerm || selectedCategory || minPrice || maxPrice;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-colors">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          <span className="flex items-center space-x-2">
            <FiFilter />
            <span>Filters</span>
          </span>
          {hasActiveFilters && (
            <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <motion.div
        initial={false}
        animate={{
          height: showFilters || window.innerWidth >= 1024 ? "auto" : 0,
        }}
        className="overflow-hidden lg:overflow-visible"
      >
        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Search Products
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name or description..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all text-base"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Min Price (${priceRange.min})
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder={`Min $${priceRange.min}`}
                min="0"
                step="0.01"
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all text-base"
              />
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Max Price (${priceRange.max})
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder={`Max $${priceRange.max}`}
                min="0"
                step="0.01"
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all text-base"
              />
            </div>
          </div>

          {/* Clear Button */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"
            >
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Search: <strong className="text-gray-900 dark:text-white">{searchTerm}</strong>
                    </span>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Category: <strong className="text-gray-900 dark:text-white">{selectedCategory}</strong>
                    </span>
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Price: <strong className="text-gray-900 dark:text-white">
                        ${minPrice || priceRange.min} - ${maxPrice || priceRange.max}
                      </strong>
                    </span>
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold"
              >
                <FiX />
                <span>Clear All</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}