import Home from "@/pages/Home";
import { lazy } from "react";
import { ROUTES } from "@/routes/paths";

// Lazy load page components for better performance
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));

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
    element: Home,
  },
  {
    path: ROUTES.PRODUCT_DETAIL,
    element: ProductDetail,
  },
  {
    path: ROUTES.CART,
    element: Cart,
  },
  {
    path: ROUTES.CHECKOUT,
    element: Checkout,
  },
];
