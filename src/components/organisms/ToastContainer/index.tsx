import { Toast } from "@/components/molecules/Toast";
import type { ToastData } from "@/contexts/ToastContext";
import "./index.scss";

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
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
