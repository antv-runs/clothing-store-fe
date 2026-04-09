import type { ReactNode } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastData {
  id: string;
  message: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastState {
  items: ToastData[];
}

export interface ToastControls {
  showToast: (toast: Omit<ToastData, "id">) => string;
  dismissToast: (id: string) => void;
}
