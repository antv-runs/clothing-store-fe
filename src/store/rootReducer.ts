import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/reducers/cartReducer";
import productReducer from "@/reducers/productReducer";
import toastReducer from "@/reducers/toastReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  toast: toastReducer,
});

export default rootReducer;
