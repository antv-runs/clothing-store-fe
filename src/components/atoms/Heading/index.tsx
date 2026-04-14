import type { ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
  noOfLines?: number;
  id?: string;
  hidden?: boolean;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-hidden"?: boolean | "false" | "true";
  role?: string;
};

/**
 * Heading atom - Strict implementation for semantic titles.
 * Supports line clamping for overflow control.
 */
export const Heading = ({
  as: Component = "h2",
  children,
  className,
  noOfLines,
  id,
  hidden,
  "aria-live": ariaLive,
  "aria-hidden": ariaHidden,
  role,
}: HeadingProps) => {
  const clampedLines =
    typeof noOfLines === "number" && noOfLines > 0
      ? Math.floor(noOfLines)
      : undefined;

  return (
    <Component
      id={id}
      hidden={hidden}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      role={role}
      className={clsx(
        "heading",
        { "heading--clamp": clampedLines },
        clampedLines && `heading--clamp-${clampedLines}`,
        className,
      )}
    >
      {children}
    </Component>
  );
};
