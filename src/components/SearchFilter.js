"use client";
import { useState, useMemo, useCallback } from "react";

export default function SearchFilter({ products, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Memoize categories for better performance
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Get price range for the dataset
  const priceRange = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const filterProducts = useCallback(
    (search, category, min, max) => {
      let filtered = products;

      // Search filter
      if (search) {
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Category filter
      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      // Price range filter
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

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Products
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or description..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Min Price (${priceRange.min.toFixed(2)})
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min price"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Price (${priceRange.max.toFixed(2)})
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max price"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={clearFilters}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear All Filters
        </button>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory || minPrice || maxPrice) && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Active filters:
            {searchTerm && ` Search: "${searchTerm}"`}
            {selectedCategory && ` Category: ${selectedCategory}`}
            {minPrice && ` Min Price: $${minPrice}`}
            {maxPrice && ` Max Price: $${maxPrice}`}
          </p>
        </div>
      )}
    </div>
  );
}
