"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const campaigns = [
  {
    title: "Fashion Night",
    targetDate:
      new Date().getTime() + 9 * 60 * 60 * 1000 + 50 * 60 * 1000 + 26 * 1000,
  },
  {
    title: "Happy Hour",
    targetDate:
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000,
  },
  {
    title: "Winter Festival",
    targetDate:
      new Date().getTime() + 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
  },
  {
    title: "Mega Sale",
    targetDate:
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000,
  },
  {
    title: "Black Friday",
    targetDate:
      new Date().getTime() + 12 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
  },
];

const HeroSlider = () => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = campaigns.map((c) => {
        const diff = c.targetDate - new Date().getTime();
        const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
        const hours = Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0);
        const minutes = Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);
        const seconds = Math.max(Math.floor((diff / 1000) % 60), 0);
        return { title: c.title, days, hours, minutes, seconds };
      });
      setTimers(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const images = [
    "/assets/banner1.jpeg",
    "/assets/banner2.jpeg",
    "/assets/banner3.jpeg",
    "/assets/banner4.jpeg",
    "/assets/banner5.jpeg",
    "/assets/banner6.jpeg",
  ];

  return (
    <section className="w-full rounded-2xl my-4 px-2 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Banner Section */}
        <div className="w-full lg:w-3/4 rounded-2xl overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden">
                  <Image
                    src={img}
                    alt={`Banner ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Campaign Section */}
        <div className="w-full lg:w-1/4 bg-gray-100 dark:bg-gray-900 shadow-sm rounded-2xl p-5 flex flex-col justify-start items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Upcoming Campaigns
          </h3>

          {/* Scrollable Campaign List */}
          <div className="flex flex-col gap-4 w-full max-h-[180px] md:max-h-[310px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
            {timers.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 w-full flex-shrink-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-md font-semibold text-gray-800 dark:text-white text-center mb-1">
                  {t.title}
                </h4>
                <p className="text-xs text-emerald-600 mb-2 text-center font-medium">
                  Campaign starts in
                </p>
                <div className="flex justify-center gap-2 text-xs flex-wrap">
                  <div className="bg-gray-800 text-white px-2 py-1 rounded-md min-w-[32px] text-center">
                    {t.days}d
                  </div>
                  <div className="bg-gray-800 text-white px-2 py-1 rounded-md min-w-[32px] text-center">
                    {t.hours}h
                  </div>
                  <div className="bg-gray-800 text-white px-2 py-1 rounded-md min-w-[32px] text-center">
                    {t.minutes}m
                  </div>
                  <div className="bg-gray-800 text-white px-2 py-1 rounded-md min-w-[32px] text-center">
                    {t.seconds}s
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
