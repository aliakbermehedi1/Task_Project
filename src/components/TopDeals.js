"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ import Link for navigation
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const TopDeals = ({ products }) => {
  const top10 = (products || []).slice(0, 10);

  // refs for custom nav buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // store swiper instance
  const [swiperInstance, setSwiperInstance] = useState(null);

  // attach refs to swiper navigation after swiper instance is ready
  useEffect(() => {
    if (!swiperInstance) return;
    if (prevRef.current && nextRef.current) {
      // eslint-disable-next-line react-hooks/immutability
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="my-7">
      <div className="bg-gradient-to-r from-green-700 via-green-300 to-emerald-600 rounded-3xl p-4 shadow-xl text-white relative overflow-hidden">
        {/* 🌟 Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-2xl font-extrabold tracking-wide flex items-center gap-2 uppercase">
                💥 Trending Now
              </h2>
              <p className="text-sm opacity-90 italic">
                Top 10 Trending Products — Limited Time Offers!
              </p>
            </div>
          </div>
          <p className="text-sm font-medium opacity-90 bg-white/20 px-3 py-1 rounded-full">
            Hurry! Limited stock available 🚀
          </p>
        </div>

        {/* 🛒 Product Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 6 },
            }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="relative"
          >
            {top10.map((product, i) => {
              const oldPrice =
                (product?.price || 0) + (product?.price || 0) * 0.3;
              // eslint-disable-next-line react-hooks/purity
              const stockLeft = Math.floor(Math.random() * 100) + 30;
              const progress = Math.min(
                100,
                Math.floor((stockLeft / 150) * 100)
              );

              return (
                <SwiperSlide key={product?.id ?? i}>
                  {/* ✅ Link to product detail page */}
                  <Link href={`/products/${product.id}`} className="block">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="bg-white text-gray-800 rounded-2xl p-4 shadow-md hover:shadow-2xl cursor-pointer relative overflow-hidden"
                    >
                      {/* 🏷 Product Image */}
                      <div className="relative w-full h-36 mb-3">
                        {product?.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain p-2 rounded-lg transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-lg" />
                        )}
                      </div>

                      {/* 🧾 Product Info */}
                      <h4 className="font-semibold text-sm line-clamp-2 h-[40px] mb-1">
                        {product?.title}
                      </h4>
                      <div className="text-gray-400 text-xs line-through">
                        ৳{oldPrice.toFixed(0)}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ৳{(product?.price || 0).toFixed(0)}
                      </div>

                      {/* 📊 Stock Progress */}
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {stockLeft}pc left
                      </p>

                      {/* 🔵 Badge */}
                      {i === 0 && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                          Best Seller
                        </div>
                      )}
                    </motion.div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* 🧭 Custom Navigation Arrows */}
          <button
            ref={prevRef}
            className="swiper-button-prev-custom absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full text-black cursor-pointer shadow-md transition-all duration-300 z-10"
            aria-label="Previous"
            type="button"
          >
            <span className="text-lg font-bold">‹</span>
          </button>

          <button
            ref={nextRef}
            className="swiper-button-next-custom absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full text-black cursor-pointer shadow-md transition-all duration-300 z-10"
            aria-label="Next"
            type="button"
          >
            <span className="text-lg font-bold">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDeals;
