import type { CartRow, CartStorageRow } from "@/types/cart";
import { CART_STORAGE_KEY } from "@/const/config";
import { DEFAULT_QUANTITY } from "@/const/config";
import { normalizeQuantity } from "@/utils/number";

/**
 * Cart Utilities: Persistence (LocalStorage) and State Sync (Vanilla Store)
 */

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const normalizeStorageKey = (key: string): string => {
  return String(key || "").trim();
};

const normalizeCartItemId = (item: CartStorageRow): string => {
  return String(item?.productId ?? item?.id ?? item?.product_id ?? "").trim();
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
        quantity: normalizeQuantity(normalizedItem?.quantity ?? 0),
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

// --- Vanilla Store Logic ---

let cart: CartRow[] = readStoredCartRows();
let subscribers: Set<() => void> = new Set();

const emitChange = () => {
  writeStoredCartRows(cart);
  subscribers.forEach((callback) => callback());
};

// Multi-tab sync via storage event
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY || event.key === null) {
      cart = readStoredCartRows();
      subscribers.forEach((callback) => callback());
    }
  });
}

export const cartStore = {
  subscribe(callback: () => void) {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  },

  getSnapshot() {
    return cart;
  },

  addItem(newItem: CartRow) {
    const qty = normalizeQuantity(newItem.quantity);

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.color === newItem.color &&
        item.size === newItem.size
    );

    if (existingIndex >= 0) {
      cart = cart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      cart = [...cart, { ...newItem, quantity: qty }];
    }
    
    emitChange();
  },

  increaseQuantity(productId: string, color: string | null = null, size: string | null = null) {
    let changed = false;
    const newCart = cart.map((item) => {
      if (item.productId === productId && item.color === color && item.size === size) {
        changed = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (changed) {
      cart = newCart;
      emitChange();
    }
  },

  decreaseQuantity(productId: string, color: string | null = null, size: string | null = null) {
    let changed = false;
    const newCart = cart.map((item) => {
      if (item.productId === productId && item.color === color && item.size === size) {
        changed = true;
        return { ...item, quantity: Math.max(DEFAULT_QUANTITY, item.quantity - 1) };
      }
      return item;
    });

    if (changed) {
      cart = newCart;
      emitChange();
    }
  },

  setQuantity(productId: string, color: string | null = null, size: string | null = null, quantity: number) {
    const safeQuantity = normalizeQuantity(quantity);
    let changed = false;
    const newCart = cart.map((item) => {
      if (item.productId === productId && item.color === color && item.size === size) {
        changed = true;
        return { ...item, quantity: safeQuantity };
      }
      return item;
    });

    if (changed) {
      cart = newCart;
      emitChange();
    }
  },

  removeItem(productId: string, color: string | null = null, size: string | null = null) {
    const newCart = cart.filter(
      (item) => !(item.productId === productId && item.color === color && item.size === size)
    );

    if (newCart.length !== cart.length) {
      cart = newCart;
      emitChange();
    }
  },

  clearCart() {
    if (cart.length > 0) {
      cart = [];
      emitChange();
    }
  },
};

