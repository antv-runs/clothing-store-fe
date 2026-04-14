import { useMemo } from "react";
import type { ToastData } from "@/types/toast";
import { MAX_VISIBLE_TOASTS } from "@/const/config";

export const useVisibleToasts = (toasts: ToastData[]): ToastData[] => {
  return useMemo(() => {
    if (toasts.length <= MAX_VISIBLE_TOASTS) {
      return toasts;
    }

    return toasts.slice(-MAX_VISIBLE_TOASTS);
  }, [toasts]);
};
