import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";
import { CART_STORAGE_KEY } from "@/const/storageKeys";
import type { CartRow } from "@/types/cart";

const DEFAULT_QUANTITY = 1;

let cart: CartRow[] = readStoredCartRows();
let subscribers: Set<() => void> = new Set();

const emitChange = () => {
  writeStoredCartRows(cart);
  subscribers.forEach((callback) => callback());
};

// Multi-tab sync via storage event
window.addEventListener("storage", (event) => {
  if (event.key === CART_STORAGE_KEY || event.key === null) {
    // We reload state from localStorage
    cart = readStoredCartRows();
    // Notify React that the store has changed
    subscribers.forEach((callback) => callback());
  }
});

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
    const normalizedQuantity = Math.max(
      DEFAULT_QUANTITY,
      Number(newItem.quantity) || DEFAULT_QUANTITY
    );

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.color === newItem.color &&
        item.size === newItem.size
    );

    // CRITICAL: Always create new object references for Immutability.
    if (existingIndex >= 0) {
      cart = cart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + normalizedQuantity }
          : item
      );
    } else {
      cart = [...cart, { ...newItem, quantity: normalizedQuantity }];
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
    const safeQuantity = Math.max(DEFAULT_QUANTITY, quantity);
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
