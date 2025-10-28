"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { motion } from "framer-motion";
import {
  FiStar,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeart,
  FiPackage,
  FiTag,
} from "react-icons/fi";
import Link from "next/link";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (product?.category) {
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) =>
          setSimilar(data.filter((p) => p.id !== product.id).slice(0, 4))
        )
        .catch(() => {});
    }
  }, [product]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-pulse">
        <div className="h-80 sm:h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl mx-auto w-full max-w-3xl"></div>
        <p className="mt-6 text-gray-500">Loading product details...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
          Product Not Found 😕
        </h1>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow hover:shadow-lg transition"
        >
          Back to Home
        </Link>
      </div>
    );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-green-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium capitalize">
            {product.category}
          </span>
        </nav>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14">
          {/* LEFT: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden group">
              <motion.img
                key={selectedImage}
                src={product.image}
                alt={product.title}
                className="w-full h-72 sm:h-[420px] md:h-[480px] object-contain p-6 sm:p-10 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Like button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`absolute top-3 right-3 sm:top-5 sm:right-5 p-3 sm:p-4 rounded-full shadow-md bg-white/80 dark:bg-gray-700/70 backdrop-blur-md transition ${
                  isLiked
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                }`}
              >
                <motion.div
                  animate={{
                    scale: isLiked ? [1, 1.4, 1] : 1,
                    rotate: isLiked ? [0, 10, -10, 0] : 0,
                  }}
                >
                  <FiHeart
                    className={`${
                      isLiked ? "fill-red-500" : ""
                    } text-lg sm:text-xl`}
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-xl border-2 overflow-hidden transition-all ${
                    selectedImage === i
                      ? "border-green-500 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-green-400"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} ${i}`}
                    className="w-full h-16 sm:h-20 object-contain bg-white p-2"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg"
          >
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < Math.round(product.rating?.rate || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {product.rating?.rate} / 5 ({product.rating?.count})
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/10 p-4 sm:p-6 rounded-2xl">
              <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                <span className="text-3xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
                  ${product.price}
                </span>
                <span className="line-through text-gray-400 text-base sm:text-xl">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  23% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiPackage /> <span>Brand: FashionCo</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiTag /> <span>SKU: #{product.id * 4571}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiShield /> <span>Material: Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiTruck /> <span>Stock: In Stock</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  icon: (
                    <FiTruck className="text-blue-600 text-lg sm:text-xl" />
                  ),
                  title: "Free Shipping",
                  desc: "On orders over $50",
                },
                {
                  icon: (
                    <FiShield className="text-green-600 text-lg sm:text-xl" />
                  ),
                  title: "Secure Payment",
                  desc: "100% protected",
                },
                {
                  icon: (
                    <FiRefreshCw className="text-purple-600 text-lg sm:text-xl" />
                  ),
                  title: "Easy Returns",
                  desc: "30-day guarantee",
                },
                {
                  icon: (
                    <FiStar className="text-yellow-500 text-lg sm:text-xl" />
                  ),
                  title: "Top Quality",
                  desc: "Premium products",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 p-3 sm:p-4 rounded-xl shadow-sm backdrop-blur-sm hover:shadow-md transition"
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {f.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4">
              <AddToCartButton product={product} />
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {product?.category && <YouMayAlsoLike category={product.category} />}
      </div>
    </section>
  );
}
