import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";

export const store = configureStore({
  reducer: rootReducer,
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
