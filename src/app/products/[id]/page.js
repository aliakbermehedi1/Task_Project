"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        <p className="text-gray-600 mt-2">
          The requested product could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              Category: {product.category}
            </span>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{product.rating?.rate}</span>
            </div>
            <span className="ml-2 text-gray-500">
              ({product.rating?.count} reviews)
            </span>
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
