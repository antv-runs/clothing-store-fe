import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import "./index.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  unstyled?: boolean;
};

export const Input = ({
  className,
  unstyled = false,
  ...inputProps
}: InputProps) => {
  return (
    <input className={clsx(!unstyled && "input", className)} {...inputProps} />
  );
};
