'use client'

import useCartStore from '../store/cartStore'
import { useState } from 'react'

export default function AddToCartButton({ product }) {
  const { addToCart } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    setIsAdding(false)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors ${
        isAdding ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}