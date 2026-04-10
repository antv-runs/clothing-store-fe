import { logger } from "@/utils/logger";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/api/Product";
import type { CartRow } from "@/types/cart";
import type { Product } from "@/types/product";
import { normalizeId } from "@/utils/formatters";
import type { ListCoreState, ListErrorKind } from "@/types/listState";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
} from "@/utils/apiErrorList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/rootStore";
import {
  addItem as actionAddItem,
  setQuantity as actionSetQuantity,
  removeItem as actionRemoveItem,
  clearCart as actionClearCart,
} from "@/actions/cartAction";

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

type UseCartRowsResult = {
  cartRows: CartRow[];
  cartItems: CartItem[];
  summary: CartSummary;
  data: CartItem[];
  isEmpty: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  isRetryingHydration: boolean;
  error: string | null;
  errorKind: ListErrorKind | null;
  hasError: boolean;
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

const HYDRATION_ERROR_MESSAGE =
  "We couldn't securely load your cart data right now.";

export const useCartRows = (): UseCartRowsResult => {
  const dispatch = useDispatch<AppDispatch>();
  const cartRows = useSelector((state: RootState) => state.cart.items);

  const [fetchedProducts, setFetchedProducts] = useState<
    Record<string, Product>
  >({});
  const [isLoading, setIsLoading] = useState(cartRows.length > 0);
  const [isRetryingHydration, setIsRetryingHydration] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hydrationError, setHydrationError] = useState<string | null>(null);
  const [hydrationErrorKind, setHydrationErrorKind] =
    useState<ListErrorKind | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const retryHydration = useCallback(() => {
    if (
      isRetryingHydration ||
      !hasError ||
      !isRetryableListErrorKind(hydrationErrorKind)
    ) {
      return;
    }

    setIsLoading(false);
    setIsRetryingHydration(true);
    setRetryTrigger((prev) => prev + 1);
  }, [hasError, hydrationErrorKind, isRetryingHydration]);

  useEffect(() => {
    let isActive = true;

    const hydrateProducts = async () => {
      const uniqueIds = Array.from(
        new Set(cartRows.map((row) => row.productId)),
      );
      const missingIds = uniqueIds.filter((id) => !fetchedProducts[id]);

      if (missingIds.length === 0) {
        setIsLoading(false);
        setHasError(false);
        setHydrationError(null);
        setHydrationErrorKind(null);
        setIsRetryingHydration(false);
        return;
      }

      if (!isRetryingHydration) {
        setIsLoading(true);
        setHasError(false);
        setHydrationError(null);
        setHydrationErrorKind(null);
      }

      try {
        const results = await Promise.all(
          missingIds.map((id) => getProductById(id)),
        );

        if (!isActive) {
          return;
        }

        const newProducts: Record<string, Product> = {};
        missingIds.forEach((id, index) => {
          const product = results[index];
          if (product) {
            newProducts[id] = product;
          }
        });

        setFetchedProducts((prev) => ({
          ...prev,
          ...newProducts,
        }));
        setHasError(false);
        setHydrationError(null);
        setHydrationErrorKind(null);
      } catch (error) {
        if (!isActive) {
          return;
        }
        logger.error("Failed to load cart product details", error);
        setHasError(true);
        setHydrationError(HYDRATION_ERROR_MESSAGE);
        setHydrationErrorKind(mapApiErrorToListErrorKind(error));
      } finally {
        if (isActive) {
          setIsLoading(false);
          setIsRetryingHydration(false);
        }
      }
    };

    void hydrateProducts();

    return () => {
      isActive = false;
    };
  }, [cartRows, fetchedProducts, isRetryingHydration, retryTrigger]);

  const getCartRows = useCallback(() => {
    return cartRows;
  }, [cartRows]);

  const addItem = useCallback(
    (item: CartRow) => {
      dispatch(actionAddItem(item) as any);
    },
    [dispatch],
  );

  const updateItemQuantity = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
      quantity: number,
    ) => {
      dispatch(actionSetQuantity(productId, color, size, quantity) as any);
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
    ) => {
      dispatch(actionRemoveItem(productId, color, size) as any);
    },
    [dispatch],
  );

  const clearCart = useCallback(() => {
    dispatch(actionClearCart() as any);
  }, [dispatch]);

  const cartItems = useMemo(() => {
    return cartRows
      .map((row) => {
        const productKey =
          Object.keys(fetchedProducts).find((key) =>
            normalizeId(String(key), row.productId),
          ) || row.productId;

        const product = fetchedProducts[productKey];
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
  }, [cartRows, fetchedProducts]);

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

  const isEmpty =
    cartRows.length === 0 ||
    (!isLoading && !hasError && cartItems.length === 0);

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
    isEmpty,
    isLoading,
    isRetrying: isRetryingHydration,
    isRetryingHydration,
    error: hydrationError,
    errorKind: hydrationErrorKind,
    hasError,
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
