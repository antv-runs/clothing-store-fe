import type { ToastData } from "@/types/toast";

export const ADD_TOAST = "toast/ADD_TOAST";
export const DISMISS_TOAST = "toast/DISMISS_TOAST";
export const CLEAR_TOASTS = "toast/CLEAR_TOASTS";

export interface AddToastAction {
  type: typeof ADD_TOAST;
  payload: ToastData;
}

export interface DismissToastAction {
  type: typeof DISMISS_TOAST;
  payload: { id: string };
}

export interface ClearToastsAction {
  type: typeof CLEAR_TOASTS;
}

export type ToastActionTypes =
  | AddToastAction
  | DismissToastAction
  | ClearToastsAction;

export const addToast = (toast: ToastData): AddToastAction => ({
  type: ADD_TOAST,
  payload: toast,
});

export const dismissToast = (id: string): DismissToastAction => ({
  type: DISMISS_TOAST,
  payload: { id },
});

export const clearToasts = (): ClearToastsAction => ({
  type: CLEAR_TOASTS,
});
