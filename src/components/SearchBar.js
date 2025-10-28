"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search in KENAKATA"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 outline-none placeholder-gray-500 text-sm sm:text-base"
        />
        <button
          className="bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-700 text-white px-5 py-3 flex items-center justify-center transition-all hover:brightness-110 active:scale-95"
          aria-label="Search"
        >
          <FiSearch className="text-xl" />
        </button>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showResults && query && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500 animate-pulse">
                Loading products...
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            ) : (
              <>
                <p className="px-4 py-2 text-sm text-gray-500 border-b dark:border-gray-700">
                  Showing{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {filtered.length}
                  </span>{" "}
                  results for <strong>{query}</strong>
                </p>

                {filtered.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 dark:hover:bg-emerald-950/30 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="relative w-10 h-10 shrink-0">
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
                  <div className="px-4 py-3 text-center text-sm text-emerald-700 dark:text-emerald-400 font-medium border-t dark:border-gray-700 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
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
