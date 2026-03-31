import "./index.scss";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  unstyled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  unstyled = false,
  className,
  type = "button",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(!unstyled && "button", !unstyled && variant, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
