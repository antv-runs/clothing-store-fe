// NOTE: This assumes `redux` package will be installed.
// The user has forbidden Redux Toolkit unless absolutely required, so using classic `legacy_createStore` API.
import { legacy_createStore as createStore, combineReducers } from "redux";
import { cartReducer } from "@/reducers/cartReducer";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";

const rootReducer = combineReducers({
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const preloadedState: any = {
    cart: { items: readStoredCartRows() },
};

export const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
    writeStoredCartRows(store.getState().cart.items);
});

export default store;
