//Home_Page
import ProductCard from "@/components/ProductCard";
import { findTopProducts } from "@/utils/topProducts";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  const topProducts = findTopProducts(products);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Saimon Shop</h1>
          <p className="text-xl opacity-90">Best products at amazing prices</p>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Top Rated Products
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Best products based on ratings and value
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">All Products</h2>
        <p className="text-gray-600 text-center mb-12">
          Explore our complete collection
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
