"use client";
import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by search query
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full md:w-[500px]">
      {/* Search Input */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search in Saimon Shop"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 outline-none placeholder-gray-500"
        />
        <button
          className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 flex items-center justify-center"
          aria-label="Search"
        >
          <FiSearch className="text-xl" />
        </button>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showResults && query && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            ) : (
              <>
                <p className="px-4 py-2 text-sm text-gray-500 border-b dark:border-gray-700">
                  Showing {filtered.length} results for <strong>{query}</strong>
                </p>
                {filtered.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="40px"
                        className="object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
                {filtered.length > 8 && (
                  <div className="px-4 py-3 text-center text-sm text-blue-600 dark:text-blue-400 font-medium border-t dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    Show More Results
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
