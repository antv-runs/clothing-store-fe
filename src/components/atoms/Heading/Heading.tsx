import type { ReactNode } from "react";
import clsx from "clsx";
import "./Heading.scss";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  as?: HeadingTag;
  children?: ReactNode;
  title?: string;
  className?: string;
  noOfLines?: number;
  id?: string;
};

export function Heading({
  as: Component = "h2",
  children,
  title,
  className,
  noOfLines,
  id,
}: HeadingProps) {
  const content = children ?? title;

  if (!content) {
    return null;
  }

  const clampedLines =
    typeof noOfLines === "number" && noOfLines > 0
      ? Math.floor(noOfLines)
      : undefined;

  return (
    <Component
      id={id}
      className={clsx(
        "heading",
        clampedLines && "heading--clamp",
        clampedLines && `heading--clamp-${clampedLines}`,
        className,
      )}
    >
      {content}
    </Component>
  );
}
