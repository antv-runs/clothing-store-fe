import { logger } from "@/utils/logger";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CartRow } from "@/types/cart";
import type { Product } from "@/types/product";
import type { ListCoreState, ListErrorKind } from "@/types/listState";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
} from "@/utils/apiErrorList";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/api/Product";
import {
  setProduct,
  setProductLoading,
  setProductError,
  selectProductsMap,
} from "@/reducers/productReducer";
import { ERROR_MESSAGES } from "@/const/errorMessages";

type CartItem = Product & {
  quantity: number;
  color: string | null;
  size: string | null;
};

type CartSummary = {
  subtotal: number;
  discount: number;
  discountPercent: number;
  delivery: number;
  total: number;
};

/**
 * Cart hydration lifecycle phases:
 * - `bootstrapping`: Initial mount. Effect has not completed its first run yet.
 * - `hydrating`:     Actively fetching product details (used for retries / subsequent fetches).
 * - `ready`:         All product data resolved (or cart is empty). Safe to evaluate isEmpty.
 * - `error`:         Product hydration failed. Retry is available.
 */
export type CartHydrationPhase =
  | "bootstrapping"
  | "hydrating"
  | "ready"
  | "error";

type UseCartRowsResult = {
  cartRows: CartRow[];
  cartItems: CartItem[];
  summary: CartSummary;
  data: CartItem[];
  phase: CartHydrationPhase;
  /** true only when phase is 'ready' AND cartItems is empty */
  isEmpty: boolean;
  /** true during bootstrapping or hydrating */
  isLoading: boolean;
  isRetrying: boolean;
  isRetryingHydration: boolean;
  error: string | null;
  errorKind: ListErrorKind | null;
  /** true when phase is 'error' */
  hasError: boolean;
  /** true when phase is 'bootstrapping' */
  isHydrating: boolean;
  retry: () => void;
  retryHydration: () => void;
  hydrationList: ListCoreState<CartItem>;
  getCartRows: () => CartRow[];
  addItem: (item: CartRow) => void;
  updateItemQuantity: (
    productId: string,
    color: string | null,
    size: string | null,
    quantity: number,
  ) => void;
  removeItem: (
    productId: string,
    color: string | null,
    size: string | null,
  ) => void;
  clearCart: () => void;
};

export const useCartRows = (): UseCartRowsResult => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cartRows,
    addItem: cartAddItem,
    setQuantity: cartSetQuantity,
    removeItem: cartRemoveItem,
    clearCart: cartClearCart,
  } = useCart();
  const products = useSelector(selectProductsMap);

  const [phase, setPhase] = useState<CartHydrationPhase>("bootstrapping");
  const [hydrationError, setHydrationError] = useState<string | null>(null);
  const [hydrationErrorKind, setHydrationErrorKind] =
    useState<ListErrorKind | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Track whether the very first effect pass has completed.
  // Until it does, the phase MUST remain 'bootstrapping'.
  const isBootstrappedRef = useRef(false);

  const retryHydration = useCallback(() => {
    if (phase !== "error" || !isRetryableListErrorKind(hydrationErrorKind)) {
      return;
    }

    setPhase("hydrating");
    setHydrationError(null);
    setHydrationErrorKind(null);
    setRetryTrigger((prev) => prev + 1);
  }, [phase, hydrationErrorKind]);

  useEffect(() => {
    let isActive = true;

    const hydrateProducts = async () => {
      const uniqueIds = Array.from(
        new Set(cartRows.map((row) => row.productId)),
      );
      const missingIds = uniqueIds.filter((id) => !products[id]);

      if (missingIds.length === 0) {
        // All product data is already cached (or cart is empty).
        if (isActive) {
          isBootstrappedRef.current = true;
          setPhase("ready");
          setHydrationError(null);
          setHydrationErrorKind(null);
        }
        return;
      }

      // If we're past the initial bootstrap, signal that we're actively hydrating
      // (for subsequent item additions). During bootstrap, phase stays 'bootstrapping'.
      if (isActive && isBootstrappedRef.current) {
        setPhase("hydrating");
      }

      try {
        await Promise.all(
          missingIds.map(async (id) => {
            dispatch(setProductLoading({ id, loading: true }));
            try {
              const product = await getProductById(id);
              if (product) {
                dispatch(setProduct({ id, product }));
                dispatch(setProductLoading({ id, loading: false }));
                dispatch(setProductError({ id, error: null }));
              } else {
                dispatch(setProductError({ id, error: "Product not found" }));
                dispatch(setProductLoading({ id, loading: false }));
              }
            } catch (err) {
              const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch product";
              dispatch(setProductError({ id, error: errorMessage }));
              dispatch(setProductLoading({ id, loading: false }));
              throw err;
            }
          }),
        );

        if (!isActive) {
          return;
        }

        isBootstrappedRef.current = true;
        setPhase("ready");
        setHydrationError(null);
        setHydrationErrorKind(null);
      } catch (error) {
        if (!isActive) {
          return;
        }
        logger.error("Failed to load cart product details", error);
        isBootstrappedRef.current = true;
        setPhase("error");
        setHydrationError(ERROR_MESSAGES.CART_HYDRATION_LOAD);
        setHydrationErrorKind(mapApiErrorToListErrorKind(error));
      }
    };

    void hydrateProducts();

    return () => {
      isActive = false;
    };
  }, [cartRows, products, retryTrigger, dispatch]);

  // ── Action dispatchers ──────────────────────────────────────────────

  const getCartRows = useCallback(() => {
    return cartRows;
  }, [cartRows]);

  const addItem = useCallback(
    (item: CartRow) => {
      cartAddItem(item);
    },
    [cartAddItem],
  );

  const updateItemQuantity = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
      quantity: number,
    ) => {
      cartSetQuantity(productId, color, size, quantity);
    },
    [cartSetQuantity],
  );

  const removeItem = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
    ) => {
      cartRemoveItem(productId, color, size);
    },
    [cartRemoveItem],
  );

  const clearCart = useCallback(() => {
    cartClearCart();
  }, [cartClearCart]);

  // ── Derived data ────────────────────────────────────────────────────

  const cartItems = useMemo(() => {
    return cartRows
      .map((row) => {
        const product = products[row.productId];
        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: row.quantity,
          color: row.color,
          size: row.size,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [cartRows, products]);

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const basePrice =
        item.pricing.original && item.pricing.original > item.pricing.current
          ? item.pricing.original
          : item.pricing.current;
      return acc + basePrice * item.quantity;
    }, 0);

    const discount = cartItems.reduce((acc, item) => {
      const original = item.pricing.original;
      if (!original || original <= item.pricing.current) {
        return acc;
      }

      return acc + (original - item.pricing.current) * item.quantity;
    }, 0);

    const delivery = 0;
    const total = subtotal - discount + delivery;
    const discountPercent =
      subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;

    return { subtotal, discount, discountPercent, delivery, total };
  }, [cartItems]);

  // ── Minimum skeleton duration ───────────────────────────────────────
  // When the cart resolves instantly (e.g. empty cart, synchronous
  // bootstrap), the skeleton would flash for a single frame. A short
  // minimum duration keeps it visible just long enough for a smooth UX
  // without feeling slow. If hydration takes longer than this, no extra
  // delay is added.

  const MIN_SKELETON_MS = 500;
  const [isMinDurationElapsed, setIsMinDurationElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinDurationElapsed(true);
    }, MIN_SKELETON_MS);
    return () => clearTimeout(timer);
  }, []);

  // ── Derived booleans from phase ─────────────────────────────────────
  // Gate the phase so consumers see 'bootstrapping' until the minimum
  // skeleton duration has elapsed. After that, the real phase flows through.

  const effectivePhase: CartHydrationPhase = isMinDurationElapsed
    ? phase
    : "bootstrapping";

  const hasError = effectivePhase === "error";
  const isHydrating = effectivePhase === "bootstrapping";
  const isLoading =
    effectivePhase === "bootstrapping" || effectivePhase === "hydrating";
  const isRetryingHydration = effectivePhase === "hydrating";
  const isEmpty = effectivePhase === "ready" && cartItems.length === 0;

  // Expose hydration lifecycle as structured state for domain pages,
  // but Cart/Checkout remain local hybrid/derived consumers (no ListStateWrapper).
  const hydrationList: ListCoreState<CartItem> = {
    data: cartItems,
    isLoading,
    isRetrying: isRetryingHydration,
    isRetryable: isRetryableListErrorKind(hydrationErrorKind),
    isEmpty,
    error: hydrationError,
    errorKind: hydrationErrorKind,
    retry: retryHydration,
  };

  return {
    cartRows,
    cartItems,
    summary,
    data: cartItems,
    phase: effectivePhase,
    isEmpty,
    isLoading,
    isRetrying: isRetryingHydration,
    isRetryingHydration,
    error: hydrationError,
    errorKind: hydrationErrorKind,
    hasError,
    isHydrating,
    retry: retryHydration,
    retryHydration,
    hydrationList,
    getCartRows,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
  };
};
