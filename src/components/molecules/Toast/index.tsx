import type { HTMLAttributes, ReactNode } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import clsx from "clsx";

import type { ToastVariant } from "@/types/toast";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  message: ReactNode;
  variant?: ToastVariant;
  onClose?: (id: string) => void;
};

export const Toast = ({
  id,
  message,
  variant = "info",
  onClose,
  className,
  ...rest
}: ToastProps) => {
  return (
    <div
      className={clsx("toast", `toast--${variant}`, className)}
      role="status"
      aria-live="polite"
      {...rest}
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
