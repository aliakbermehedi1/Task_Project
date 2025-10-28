import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";

const TopDeals = ({ products }) => {
  const top10 = products.slice(0, 10);

  return (
    <section className="mt-60 mx-10">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 shadow-md text-white relative overflow-hidden">
        {/* 🎉 Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-2xl animate-pulse" />
            <h2 className="text-2xl font-bold tracking-wide">
              DEAL OF THE DAY
            </h2>
          </div>
          <p className="text-sm italic opacity-90">
            Hurry! Limited stock on these top picks.
          </p>
        </div>

        {/* 🛒 Product Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        >
          {top10.map((product, i) => {
            const oldPrice = product.price + product.price * 0.3;
            // eslint-disable-next-line react-hooks/purity
            const stockLeft = Math.floor(Math.random() * 100) + 30;
            const progress = Math.min(100, Math.floor((stockLeft / 150) * 100));

            return (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white text-gray-800 rounded-2xl p-4 shadow hover:shadow-lg cursor-pointer relative overflow-hidden"
                >
                  {/* 🏷 Product Image */}
                  <div className="relative w-full h-36 mb-3">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-2 rounded-lg"
                    />
                  </div>

                  {/* 🧾 Product Info */}
                  <h4 className="font-medium text-sm line-clamp-2 h-[40px] mb-1">
                    {product.title}
                  </h4>
                  <div className="text-gray-500 text-xs line-through">
                    ৳{oldPrice.toFixed(0)}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    ৳{product.price.toFixed(0)}
                  </div>

                  {/* 📊 Stock Progress */}
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
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
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TopDeals;
