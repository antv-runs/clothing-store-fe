import "./index.scss";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  unstyled?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  unstyled = false,
  isLoading = false,
  loadingText,
  className,
  type = "button",
  disabled,
  ...buttonProps
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        !unstyled && "button",
        !unstyled && `button--${variant}`,
        isLoading && "is-loading",
        className,
      )}
      {...buttonProps}
    >
      {isLoading ? loadingText ?? children : children}
    </button>
  );
};
