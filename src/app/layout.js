import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saimon Global Shop - Premium E-commerce",
  description: "Discover amazing products at unbeatable prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950 transition-colors`}
      >
        {/* Common Components */}
        <Header />
        <CartSidebar />
        <ScrollToTop />

        {/* Main Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Toast Container — for global toast messages */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ top: "80px" }}
        />

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Saimon Shop
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your trusted destination for premium quality products at
                  amazing prices. Shop with confidence!
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
                    </svg>
                  </a>
                  {/* ...other social icons... */}
                </div>
              </div>

              {/* Quick Links + Support Sections */}
              {/* (rest of footer remains unchanged) */}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 Saimon Shop. All rights reserved. Built with ❤️ for
                Saimon Global Ltd.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
