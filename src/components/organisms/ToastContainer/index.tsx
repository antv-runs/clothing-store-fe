import type { HTMLAttributes } from "react";
import { Toast } from "@/components/molecules/Toast";
import type { ToastData } from "@/types/toast";
import clsx from "clsx";
import "./index.scss";

type ToastContainerProps = HTMLAttributes<HTMLDivElement> & {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
};

export const ToastContainer = ({ toasts, onDismiss, className, ...rest }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className={clsx("toast-container", className)} aria-live="polite" {...rest}>
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-container__item">
          <Toast
            id={toast.id}
            message={toast.message}
            variant={toast.variant}
            onClose={onDismiss}
          />
        </div>
      ))}
    </div>
  );
};
