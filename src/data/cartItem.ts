import type { CartRow } from "../pages/CartPage";

/**
 * Mock cart items for testing and development.
 * These are pre-normalized CartRow format items ready to map with products.
 */
export const mockCartItems: CartRow[] = [
  {
    productId: "180",
    quantity: 2,
    color: "green",
    size: "Large",
  },
  {
    productId: "171",
    quantity: 1,
    color: "black",
    size: "Medium",
  },
  {
    productId: "179",
    quantity: 1,
    color: "red",
    size: "Large",
  },
];
