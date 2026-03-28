import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  unstyled?: boolean;
};

export function Input({
  className,
  unstyled = false,
  ...inputProps
}: InputProps) {
  return (
    <input
      className={clsx(!unstyled && styles.input, className)}
      {...inputProps}
    />
  );
}
