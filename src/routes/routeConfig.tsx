/**
 * Route configuration
 * Defines all application routes and their corresponding components
 */

import { lazy } from "react";
import { ROUTES } from "./paths";

// Lazy load page components for better performance
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

/**
 * Application route configuration array
 * Each route maps a path to its corresponding page component
 */
export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: HomePage,
  },
  {
    path: ROUTES.PRODUCT_DETAIL,
    element: ProductDetailPage,
  },
  {
    path: ROUTES.CART,
    element: CartPage,
  },
];
