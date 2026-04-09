import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToast, dismissToast as dismissToastAction } from "@/actions/toastAction";
import type { AppDispatch } from "@/store/cartStore";
import type { ToastControls, ToastData } from "@/types/toast";

export const useToast = (): ToastControls => {
  const dispatch = useDispatch<AppDispatch>();

  const dismissToast = useCallback(
    (id: string) => {
      dispatch(dismissToastAction(id));
    },
    [dispatch],
  );

  const showToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      dispatch(addToast({ ...toast, id }));

      const duration = toast.duration ?? 3000;
      if (duration > 0) {
        setTimeout(() => {
          dispatch(dismissToastAction(id));
        }, duration);
      }

      return id;
    },
    [dispatch],
  );

  return { showToast, dismissToast };
};
