import type { ReactNode } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import clsx from "clsx";

export type ToastVariant = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  message: ReactNode;
  variant?: ToastVariant;
  onClose?: (id: string) => void;
}

export const Toast = ({
  id,
  message,
  variant = "info",
  onClose,
}: ToastProps) => {
  return (
    <div
      className={clsx("toast", `toast--${variant}`)}
      role="status"
      aria-live="polite"
    >
      <div className="toast__content">
        <p>{message}</p>
      </div>
      {onClose && (
        <IconButton
          className="toast__close"
          svgName="icn_close"
          ariaLabel="Close notification"
          iconWidth={14}
          iconHeight={14}
          onClick={() => onClose(id)}
        />
      )}
    </div>
  );
};
