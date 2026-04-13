import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartRow } from "@/types/cart";
import type { RootState } from "@/store";

export interface CartState {
  items: CartRow[];
}

const initialState: CartState = {
  items: [],
};

const DEFAULT_QUANTITY = 1;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action: PayloadAction<CartRow>) => {
      const newItem = action.payload;
      const normalizedQuantity = Math.max(
        DEFAULT_QUANTITY,
        Number(newItem.quantity) || DEFAULT_QUANTITY
      );

      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += normalizedQuantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: normalizedQuantity,
        });
      }
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        color: string | null;
        size: string | null;
      }>
    ) => {
      const { productId, color, size } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        color: string | null;
        size: string | null;
      }>
    ) => {
      const { productId, color, size } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );
      if (item) {
        item.quantity = Math.max(DEFAULT_QUANTITY, item.quantity - 1);
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        color: string | null;
        size: string | null;
        quantity: number;
      }>
    ) => {
      const { productId, color, size, quantity } = action.payload;
      const safeQuantity = Math.max(DEFAULT_QUANTITY, quantity);
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );
      if (item) {
        item.quantity = safeQuantity;
      }
    },

    removeItem: (
      state,
      action: PayloadAction<{
        productId: string;
        color: string | null;
        size: string | null;
      }>
    ) => {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          )
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartRow[] => state.cart.items;

export const selectCartItemCount = (state: RootState): number =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export default cartSlice.reducer;
