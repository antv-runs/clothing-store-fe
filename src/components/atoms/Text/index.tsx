import type { ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

type TextProps = {
  as?: "p" | "span" | "div";
  children: ReactNode;
  className?: string;
  lineClamp?: number;
  hidden?: boolean;
};

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  hidden,
}: TextProps) => {
  return (
    <Component
      className={clsx(
        "text",
        lineClamp && `text--clamp-${lineClamp}`,
        className,
      )}
      hidden={hidden}
    >
      {children}
    </Component>
  );
};
