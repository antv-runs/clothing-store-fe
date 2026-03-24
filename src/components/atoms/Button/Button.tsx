import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ children, variant = "primary" }: ButtonProps) {
  return (
    <button className={clsx(styles.button, styles[variant])}>{children}</button>
  );
}
