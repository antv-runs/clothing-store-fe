/**
 * Route path constants
 * Centralized location for all route paths in the application
 */

export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAIL: "/product/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
} as const;

/**
 * Helper function to build dynamic product detail path
 * @param id - Product ID
 * @returns Complete path to product detail page
 */
export function buildProductDetailPath(id: string | number): string {
  return `/product/${id}`;
}
