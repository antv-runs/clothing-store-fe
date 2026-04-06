import { useCallback, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/api/Product";
import type { CartRow } from "@/types/cart";
import type { Product } from "@/types/product";
import { normalizeId } from "@/utils/formatters";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";

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
  isEmpty: boolean;
  isLoading: boolean;
  isRetryingHydration: boolean;
  hasError: boolean;
  retryHydration: () => void;
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

const DEFAULT_QUANTITY = 1;

const normalizeQuantity = (value: number | string): number => {
  const parsed = Number(value);
  return Math.max(
    DEFAULT_QUANTITY,
    Number.isFinite(parsed) ? parsed : DEFAULT_QUANTITY,
  );
};

export const useCartRows = (): UseCartRowsResult => {
  const [cartRows, setCartRows] = useState<CartRow[]>(() =>
    readStoredCartRows(),
  );

  const [fetchedProducts, setFetchedProducts] = useState<
    Record<string, Product>
  >({});
  const [isLoading, setIsLoading] = useState(
    () => readStoredCartRows().length > 0,
  );
  const [isRetryingHydration, setIsRetryingHydration] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const retryHydration = useCallback(() => {
    setIsRetryingHydration(true);
    setRetryTrigger((prev) => prev + 1);
  }, []);

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
        setIsRetryingHydration(false);
        return;
      }

      if (!isRetryingHydration) {
        setIsLoading(true);
        setHasError(false);
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
      } catch (error) {
        if (!isActive) {
          return;
        }
        console.error("Failed to load cart product details", error);
        setHasError(true);
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
    return readStoredCartRows();
  }, []);

  const addItem = useCallback((item: CartRow) => {
    const existingRows = readStoredCartRows();
    const nextRows: CartRow[] = [...existingRows];

    const normalizedProductId = String(item.productId || "").trim();
    const normalizedColor = item.color ?? null;
    const normalizedSize = item.size ?? null;
    const normalizedQuantity = normalizeQuantity(item.quantity);

    const existingIndex = nextRows.findIndex((row) => {
      return (
        row.productId === normalizedProductId &&
        (row.color ?? null) === normalizedColor &&
        (row.size ?? null) === normalizedSize
      );
    });

    if (existingIndex >= 0) {
      nextRows[existingIndex] = {
        ...nextRows[existingIndex],
        quantity: normalizeQuantity(
          nextRows[existingIndex].quantity + normalizedQuantity,
        ),
      };
    } else {
      nextRows.push({
        productId: normalizedProductId,
        quantity: normalizedQuantity,
        color: normalizedColor,
        size: normalizedSize,
      });
    }

    writeStoredCartRows(nextRows);
    setCartRows(nextRows);
  }, []);

  const updateItemQuantity = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
      quantity: number,
    ) => {
      const existingRows = readStoredCartRows();
      const normalizedProductId = String(productId || "").trim();
      const newQuantity = normalizeQuantity(quantity);

      if (newQuantity < 1) return;

      const nextRows = existingRows.map((row) => {
        if (
          row.productId === normalizedProductId &&
          (row.color ?? null) === color &&
          (row.size ?? null) === size
        ) {
          return { ...row, quantity: newQuantity };
        }
        return row;
      });

      writeStoredCartRows(nextRows);
      setCartRows(nextRows);
    },
    [],
  );

  const removeItem = useCallback(
    (
      productId: string,
      color: string | null = null,
      size: string | null = null,
    ) => {
      const existingRows = readStoredCartRows();
      const normalizedProductId = String(productId || "").trim();

      const nextRows = existingRows.filter((row) => {
        return !(
          row.productId === normalizedProductId &&
          (row.color ?? null) === color &&
          (row.size ?? null) === size
        );
      });

      writeStoredCartRows(nextRows);
      setCartRows(nextRows);
    },
    [],
  );

  const clearCart = useCallback(() => {
    writeStoredCartRows([]);
    setCartRows([]);
  }, []);

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

  return {
    cartRows,
    cartItems,
    summary,
    isEmpty,
    isLoading,
    isRetryingHydration,
    hasError,
    retryHydration,
    getCartRows,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
  };
};
