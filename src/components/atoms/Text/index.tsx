import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

type TextProps = HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement> & {
  as?: "p" | "span" | "div";
  children: ReactNode;
  lineClamp?: number;
};

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  ...rest
}: TextProps) => {
  return (
    <Component
      className={clsx(
        "text",
        lineClamp && `text--clamp-${lineClamp}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
