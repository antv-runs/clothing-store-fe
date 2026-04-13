import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "@/reducers/productReducer";
import toastReducer from "@/reducers/toastReducer";

const rootReducer = combineReducers({
  product: productReducer,
  toast: toastReducer,
});

export default rootReducer;
