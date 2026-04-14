import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToastData } from "@/types/toast";
import type { RootState } from "@/store";

export type ToastState = {
  items: ToastData[];
};

const initialState: ToastState = {
  items: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastData>) => {
      state.items.push(action.payload);
    },

    dismissToast: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((toast) => toast.id !== action.payload.id);
    },

    clearToasts: (state) => {
      state.items = [];
    },
  },
});

export const { addToast, dismissToast, clearToasts } = toastSlice.actions;

// Selectors
export const selectToastItems = (state: RootState): ToastData[] =>
  state.toast.items;

export default toastSlice.reducer;
