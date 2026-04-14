import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "@/components/organisms/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { useVisibleToasts } from "@/hooks/useVisibleToasts";
import { selectToastItems } from "@/reducers/toastReducer";

/**
 * Redux-backed runtime bridge for global toast rendering and global API error events.
 */
export const ToastRuntime = () => {
  const { showToast, dismissToast } = useToast();
  const toasts = useSelector(selectToastItems);
  const visibleToasts = useVisibleToasts(toasts);

  useEffect(() => {
    const handleGlobalError = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string }>;
      if (customEvent.detail?.message) {
        showToast({
          message: customEvent.detail.message,
          variant: "error",
          duration: 5000,
        });
      }
    };

    window.addEventListener("global-api-error", handleGlobalError);
    return () => {
      window.removeEventListener("global-api-error", handleGlobalError);
    };
  }, [showToast]);

  return <ToastContainer toasts={visibleToasts} onDismiss={dismissToast} />;
};
