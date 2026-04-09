import {
  ADD_TOAST,
  CLEAR_TOASTS,
  DISMISS_TOAST,
  type ToastActionTypes,
} from "@/actions/toastAction";
import type { ToastData } from "@/types/toast";

export interface ToastState {
  items: ToastData[];
}

const initialState: ToastState = {
  items: [],
};

export const toastReducer = (
  state = initialState,
  action: ToastActionTypes,
): ToastState => {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case DISMISS_TOAST:
      return {
        ...state,
        items: state.items.filter((toast) => toast.id !== action.payload.id),
      };

    case CLEAR_TOASTS:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};
