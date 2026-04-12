import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById } from "@/api/Product";
import type { RootState } from "@/store";

export const fetchProductById = createAsyncThunk<
  void,
  string,
  { state: RootState }
>(
  "product/fetchProductById",
  async (productId, { getState, dispatch }) => {
    const state = getState();
    const existingProduct = state.product.byId[productId];
    const isLoading = state.product.loadingById[productId];

    // Skip if already cached or loading
    if (existingProduct || isLoading) {
      return;
    }

    dispatch({ type: "product/setProductLoading", payload: { id: productId, loading: true } });

    try {
      const product = await getProductById(productId);
      dispatch({ type: "product/setProduct", payload: { id: productId, product } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch product";
      dispatch({ type: "product/setProductError", payload: { id: productId, error: errorMessage } });
    }
  }
);
