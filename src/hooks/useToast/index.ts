import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addToast,
  dismissToast as dismissToastAction,
} from "@/reducers/toastReducer";
import type { AppDispatch } from "@/store";
import type { ToastControls, ToastData } from "@/types/toast";
import { TOAST_DEFAULT_DURATION } from "@/const/ui";

export const useToast = (): ToastControls => {
  const dispatch = useDispatch<AppDispatch>();

  const dismissToast = useCallback(
    (id: string) => {
      dispatch(dismissToastAction({ id }));
    },
    [dispatch],
  );

  const showToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      dispatch(addToast({ ...toast, id }));

      const duration = toast.duration ?? TOAST_DEFAULT_DURATION;
      if (duration > 0) {
        setTimeout(() => {
          dispatch(dismissToastAction({ id }));
        }, duration);
      }

      return id;
    },
    [dispatch],
  );

  return { showToast, dismissToast };
};
