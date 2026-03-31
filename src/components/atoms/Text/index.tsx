import type { ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

type TextProps = {
  as?: "p" | "span" | "div";
  children: ReactNode;
  className?: string;
  lineClamp?: number;
};

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
}: TextProps) => {
  return (
    <Component
      className={clsx(
        "text",
        lineClamp && `text--clamp-${lineClamp}`,
        className,
      )}
    >
      {children}
    </Component>
  );
};
