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
} from "react-icons/fi";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
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
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const productData = await res.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center ">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">😕</span>
          </div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span>/</span>
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {product.category}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg overflow-hidden group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg"
            >
              <FiHeart
                className={`text-xl ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              />
            </motion.button>

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Thumbnail Images (simulated) */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all ${
                  selectedImage === index
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Category Badge */}
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating?.rate || 0)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {product.rating?.rate}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              ({product.rating?.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
            <div className="flex items-end space-x-4">
              <span className="text-5xl font-bold text-green-600 dark:text-green-400">
                ${product.price}
              </span>
              <span className="text-gray-500 dark:text-gray-400 line-through text-xl pb-2">
                ${(product.price * 1.3).toFixed(2)}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold pb-2">
                23% OFF
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FiTruck className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Free Shipping
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <FiShield className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Secure Payment
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  100% protected
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <FiRefreshCw className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  30-day guarantee
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <FiStar className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Top Quality
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Premium products
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-6">
            <AddToCartButton product={product} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
