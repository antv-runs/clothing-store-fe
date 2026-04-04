import { useCallback, useMemo, useState } from "react";
import { products } from "@/const/products";
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
  delivery: number;
  total: number;
};

type UseCartRowsResult = {
  cartRows: CartRow[];
  cartItems: CartItem[];
  summary: CartSummary;
  isEmpty: boolean;
  getCartRows: () => CartRow[];
  addItem: (item: CartRow) => void;
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

  const clearCart = useCallback(() => {
    writeStoredCartRows([]);
    setCartRows([]);
  }, []);

  const cartItems = useMemo(() => {
    return cartRows
      .map((row) => {
        const product = products.find((item) =>
          normalizeId(String(item.id), row.productId),
        );
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
  }, [cartRows]);

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

    return { subtotal, discount, delivery, total };
  }, [cartItems]);

  const isEmpty = cartItems.length === 0;

  return {
    cartRows,
    cartItems,
    summary,
    isEmpty,
    getCartRows,
    addItem,
    clearCart,
  };
};
