import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cart/cartSlice";
import toastReducer from "@/store/toast/toastSlice";
import productReducer from "@/store/product/productSlice";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    toast: toastReducer,
    product: productReducer,
  },
  preloadedState: {
    cart: { items: readStoredCartRows() },
    toast: { items: [] },
    product: { byId: {}, loadingById: {}, errorById: {} },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  writeStoredCartRows(store.getState().cart.items);
});

export default store;
