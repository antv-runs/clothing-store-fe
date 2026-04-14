import type { HTMLAttributes } from "react";
import clsx from "clsx";
import "./index.scss";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  className?: string; // explicitly listed although part of HTMLAttributes
};

export const Spinner = ({ className, ...rest }: SpinnerProps) => {
  return (
    <div
      className={clsx("spinner", className)}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <div className="spinner__circle"></div>
    </div>
  );
};
