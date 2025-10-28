"use client";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useCartStore from "@/store/cartStore";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

const YouMayAlsoLike = ({ category }) => {
  const [related, setRelated] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { addToCart } = useCartStore();

  // Fetch similar products by category
  useEffect(() => {
    const fetchRelated = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const similar = data.filter((p) => p.category === category);
      setRelated(similar.slice(0, 10));
    };
    fetchRelated();
  }, [category]);

  // ✅ Attach navigation buttons
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      // eslint-disable-next-line react-hooks/immutability
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title.slice(0, 20)} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (!related.length) return null;

  return (
    <section className="mt-20">
      <div className="bg-linear-to-r from-emerald-800 via-green-600 to-emerald-700 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold uppercase flex items-center gap-2">
              💚 You May Also Like
            </h2>
            <p className="text-sm opacity-90 italic">
              Similar products based on your interest
            </p>
          </div>
          <p className="text-xs md:text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm shadow">
            Recommended for you ✨
          </p>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            onSwiper={setSwiperInstance}
          >
            {related.map((product) => {
              const oldPrice = product.price * 1.25;
              const discount = Math.floor((1 - product.price / oldPrice) * 100);
              const rating = Math.round(product.rating?.rate || 4);
              // eslint-disable-next-line react-hooks/purity
              const stockLeft = Math.floor(Math.random() * 80) + 20;

              return (
                <SwiperSlide key={product.id}>
                  <Link href={`/products/${product.id}`} scroll={true}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="bg-white text-gray-800 rounded-2xl p-4 shadow-md hover:shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative w-full h-36 mb-3">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Info */}
                      <h4 className="font-semibold text-sm line-clamp-2 h-[40px] mb-1">
                        {product.title}
                      </h4>

                      {/* Rating */}
                      <div className="flex justify-center items-center text-yellow-400 text-sm mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={
                              i < rating ? "opacity-100" : "opacity-30"
                            }
                          />
                        ))}
                      </div>

                      {/* Price */}
                      <div className="text-gray-400 text-xs line-through">
                        ৳{oldPrice.toFixed(0)}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ৳{product.price.toFixed(0)}
                      </div>

                      {/* Stock Bar */}
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(stockLeft, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {stockLeft} pcs left
                      </p>

                      {/* Discount */}
                      <div className="absolute top-2 left-2 bg-linear-to-r from-orange-500 to-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                        -{discount}%
                      </div>

                      {/* Add to Cart */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="absolute bottom-3 right-3 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 p-2 rounded-full shadow-md text-white"
                      >
                        <FiShoppingCart className="text-xl" />
                      </motion.button>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Arrows */}
          <button
            ref={prevRef}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full text-black cursor-pointer shadow-md transition-all duration-300 z-10"
          >
            ‹
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full text-black cursor-pointer shadow-md transition-all duration-300 z-10"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
