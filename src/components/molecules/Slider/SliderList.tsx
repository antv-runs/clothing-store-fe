import React, { forwardRef } from "react";

/**
 * SliderList — a thin forwardRef wrapper around <ul>.
 *
 * The forwarded ref is needed by callers (e.g. ProductCardList) that must
 * query the track's DOM node directly (offsetLeft, getBoundingClientRect, gap).
 * className is required — no default is provided to avoid hidden coupling.
 */
export const SliderList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, ...props }, ref) => {
  return (
    <ul ref={ref} {...props}>
      {children}
    </ul>
  );
});

SliderList.displayName = "SliderList";
