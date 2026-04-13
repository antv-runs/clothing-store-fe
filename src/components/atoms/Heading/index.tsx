import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
  children?: ReactNode;
  noOfLines?: number;
};

export const Heading = ({
  as: Component = "h2",
  children,
  className,
  noOfLines,
  ...rest
}: HeadingProps) => {
  if (!children) {
    return null;
  }

  const clampedLines =
    typeof noOfLines === "number" && noOfLines > 0
      ? Math.floor(noOfLines)
      : undefined;

  return (
    <Component
      className={clsx(
        "heading",
        clampedLines && "heading--clamp",
        clampedLines && `heading--clamp-${clampedLines}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
