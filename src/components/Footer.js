"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Galada } from "next/font/google";
import { toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";

const galada = Galada({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  // toast handler for non-functional links
  const handleNotBuilt = (e) => {
    e.preventDefault();
    toast.info("🚧 This feature is not yet built!", {
      position: "top-right",
      theme: "colored",
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900 border-t border-gray-300 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`${galada.className} text-4xl font-bold select-none bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-400`}
                style={{
                  letterSpacing: "-0.5px",
                  textShadow:
                    "0 2px 5px rgba(0,0,0,0.25), 0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                কেনাকাটা
              </motion.span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              আপনার বিশ্বস্ত অনলাইন শপ যেখানে মান আর আস্থা আর একসাথে। ভালো দামে
              পছন্দের পণ্য পেতে — কেনাকাটা হোক আনন্দের সাথে।
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 pt-3">
              {[
                { icon: "ri-facebook-fill", color: "hover:text-blue-500" },
                { icon: "ri-instagram-line", color: "hover:text-pink-500" },
                {
                  icon: "ri-twitter-x-line",
                  color: "hover:text-gray-700 dark:hover:text-gray-300",
                },
                { icon: "ri-youtube-fill", color: "hover:text-red-600" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={handleNotBuilt}
                  className={`text-2xl text-gray-600 dark:text-gray-400 transition ${s.color}`}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {["About Us", "Shop", "Blog", "Offers"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={handleNotBuilt}
                    className="hover:text-green-600 dark:hover:text-green-400 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms & Conditions",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={handleNotBuilt}
                    className="hover:text-green-600 dark:hover:text-green-400 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-800 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Saimon Global Limited — All rights
            reserved.{" "}
            <motion.a
              href="https://github.com/aliakbermehedi1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                color: "#10B981", // nice green highlight
                textShadow: "0 0 8px rgba(16,185,129,0.8)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="font-semibold cursor-pointer inline-block ml-1"
            >
              Dev. Ali Akber Mehedi 💻
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  );
}
