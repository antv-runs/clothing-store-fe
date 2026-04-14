import type { ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

type TextProps = {
  as?: "p" | "span" | "div";
  children: ReactNode;
  className?: string;
  lineClamp?: number;
  id?: string;
  hidden?: boolean;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-hidden"?: boolean | "false" | "true";
  role?: string;
};

/**
 * Text atom - Strict implementation for body content and labels.
 * Supports line clamping for overflow control.
 */
export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  id,
  hidden,
  "aria-live": ariaLive,
  "aria-hidden": ariaHidden,
  role,
}: TextProps) => {
  return (
    <Component
      id={id}
      hidden={hidden}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      role={role}
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
