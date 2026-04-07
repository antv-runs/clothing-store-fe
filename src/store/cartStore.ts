// NOTE: This assumes `redux` package will be installed.
// The user has forbidden Redux Toolkit unless absolutely required, so using classic `legacy_createStore` API.
import { legacy_createStore as createStore, combineReducers } from "redux";
import { cartReducer } from "@/reducers/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Simple store setup, ready for middleware implementation (like Redux Thunk or Saga) later
export const store = createStore(rootReducer);

export default store;
