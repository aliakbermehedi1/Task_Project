/**
 * Efficiently finds the top 10 products from a large dataset based on rating and price
 * Higher rated products are preferred. If ratings are equal, lower priced products are preferred.
 *
 * @param {Array} products - Array of product objects
 * @returns {Array} Top 10 products
 */
export function findTopProducts(products) {
  if (!products || products.length === 0) return [];

  // Create a copy to avoid mutating original array
  const productsCopy = [...products];

  // Sort products by rating (descending) and then by price (ascending)
  productsCopy.sort((a, b) => {
    // First compare by rating (higher is better)
    const ratingDiff = b.rating.rate - a.rating.rate;
    if (ratingDiff !== 0) return ratingDiff;

    // If ratings are equal, compare by price (lower is better)
    return a.price - b.price;
  });

  // Return top 10 products
  return productsCopy.slice(0, 10);
}

/**
 * Alternative optimized version using a single pass with max heap
 * More efficient for very large datasets
 */
export function findTopProductsOptimized(products) {
  if (!products || products.length === 0) return [];

  // Use a min-heap approach to keep track of top 10
  const topProducts = [];

  for (const product of products) {
    // Calculate a score (higher is better)
    const score = product.rating.rate * 100 - product.price;

    // If we have less than 10 products, just add it
    if (topProducts.length < 10) {
      topProducts.push({ product, score });
      topProducts.sort((a, b) => b.score - a.score);
    }
    // If we have 10 products, replace the lowest if current is better
    else if (score > topProducts[9].score) {
      topProducts[9] = { product, score };
      topProducts.sort((a, b) => b.score - a.score);
    }
  }

  return topProducts.map((item) => item.product);
}
