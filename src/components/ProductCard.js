'use client'
import Link from 'next/link'
import useCartStore from '../store/cartStore'

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <Link href={`/products/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {product.category}
        </span>
        
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mt-2 mb-1 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 dark:text-white transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}