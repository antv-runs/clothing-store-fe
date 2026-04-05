import type { CartRow, CartStorageRow } from "@/types/cart";

import { CART_STORAGE_KEY } from "@/const/storageKeys";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const DEFAULT_QUANTITY = 1;

const normalizeStorageKey = (key: string): string => {
  return String(key || "").trim();
};

const normalizeCartItemId = (item: CartStorageRow): string => {
  return String(item?.productId ?? item?.id ?? item?.product_id ?? "").trim();
};

const normalizeQuantity = (value: unknown): number => {
  return Math.max(DEFAULT_QUANTITY, Number(value) || DEFAULT_QUANTITY);
};

export function normalizeCartStorageRows(items: unknown): CartRow[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const normalizedItem = item as CartStorageRow;
      const productId = normalizeCartItemId(normalizedItem);

      return {
        productId,
        quantity: normalizeQuantity(normalizedItem?.quantity),
        color: normalizedItem?.color ?? null,
        size: normalizedItem?.size ?? null,
      };
    })
    .filter((item) => item.productId.length > 0);
}

export function readStoredCartRows(
  storage: StorageLike | null | undefined = typeof window !== "undefined"
    ? window.localStorage
    : null,
  storageKey: string = CART_STORAGE_KEY,
): CartRow[] {
  const normalizedKey = normalizeStorageKey(storageKey);
  if (!storage || !normalizedKey) {
    return [];
  }

  try {
    const rawValue = storage.getItem(normalizedKey);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return normalizeCartStorageRows(parsedValue);
  } catch {
    return [];
  }
}

export function writeStoredCartRows(
  rows: CartRow[],
  storage: StorageLike | null | undefined = typeof window !== "undefined"
    ? window.localStorage
    : null,
  storageKey: string = CART_STORAGE_KEY,
): void {
  const normalizedKey = normalizeStorageKey(storageKey);
  if (!storage || !normalizedKey) {
    return;
  }

  const normalizedRows = normalizeCartStorageRows(rows);

  // Keep both `id` and `productId` to stay compatible with legacy scripts.
  const serializableRows = normalizedRows.map((row) => ({
    id: row.productId,
    productId: row.productId,
    quantity: row.quantity,
    color: row.color,
    size: row.size,
  }));

  storage.setItem(normalizedKey, JSON.stringify(serializableRows));
}
