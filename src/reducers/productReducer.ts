import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import type { RootState } from "@/store";

export type ProductState = {
  byId: Record<string, Product>;
  loadingById: Record<string, boolean>;
  errorById: Record<string, string | null>;
};

const initialState: ProductState = {
  byId: {},
  loadingById: {},
  errorById: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<{ id: string; product: Product }>) => {
      const { id, product } = action.payload;
      state.byId[id] = product;
    },
    setProductLoading: (state, action: PayloadAction<{ id: string; loading: boolean }>) => {
      const { id, loading } = action.payload;
      state.loadingById[id] = loading;
    },
    setProductError: (state, action: PayloadAction<{ id: string; error: string | null }>) => {
      const { id, error } = action.payload;
      state.errorById[id] = error;
    },
  },
});

export const { setProduct, setProductLoading, setProductError } = productSlice.actions;

// Selectors
export const selectProductsMap = (state: RootState): Record<string, Product> =>
  state.product.byId;

export const selectProductById = (state: RootState, id: string): Product | undefined =>
  state.product.byId[id];

export const selectProductLoading = (state: RootState, id: string): boolean =>
  state.product.loadingById[id] ?? false;

export const selectProductError = (state: RootState, id: string): string | null =>
  state.product.errorById[id] ?? null;

export default productSlice.reducer;
