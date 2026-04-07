import type { CartRow } from "@/types/cart";

// Action Types
export const ADD_ITEM = "cart/ADD_ITEM";
export const INCREASE_QUANTITY = "cart/INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "cart/DECREASE_QUANTITY";
export const REMOVE_ITEM = "cart/REMOVE_ITEM";
export const CLEAR_CART = "cart/CLEAR_CART";
export const HYDRATE_CART = "cart/HYDRATE_CART";

// Action Interfaces
export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: CartRow;
}

export interface IncreaseQuantityAction {
  type: typeof INCREASE_QUANTITY;
  payload: { productId: string; color: string | null; size: string | null };
}

export interface DecreaseQuantityAction {
  type: typeof DECREASE_QUANTITY;
  payload: { productId: string; color: string | null; size: string | null };
}

export interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: { productId: string; color: string | null; size: string | null };
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

export interface HydrateCartAction {
  type: typeof HYDRATE_CART;
  payload: CartRow[];
}

export type CartActionTypes =
  | AddItemAction
  | IncreaseQuantityAction
  | DecreaseQuantityAction
  | RemoveItemAction
  | ClearCartAction
  | HydrateCartAction;

// Action Creators
export const addItem = (item: CartRow): AddItemAction => ({
  type: ADD_ITEM,
  payload: item,
});

export const increaseQuantity = (
  productId: string,
  color: string | null = null,
  size: string | null = null
): IncreaseQuantityAction => ({
  type: INCREASE_QUANTITY,
  payload: { productId, color, size },
});

export const decreaseQuantity = (
  productId: string,
  color: string | null = null,
  size: string | null = null
): DecreaseQuantityAction => ({
  type: DECREASE_QUANTITY,
  payload: { productId, color, size },
});

export const removeItem = (
  productId: string,
  color: string | null = null,
  size: string | null = null
): RemoveItemAction => ({
  type: REMOVE_ITEM,
  payload: { productId, color, size },
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});

export const hydrateCart = (items: CartRow[]): HydrateCartAction => ({
  type: HYDRATE_CART,
  payload: items,
});
