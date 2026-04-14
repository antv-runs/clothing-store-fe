import React, { type HTMLAttributes } from "react";
import { MAX_RATING } from "@/const/ui";
import "./index.scss";

type StarProps = HTMLAttributes<HTMLSpanElement> & {
  rating: number;
  showEmpty?: boolean;
  maxStars?: number;
  size?: number | string;
  halfStarMode?: "path" | "clip";
};

export const Star = ({
  rating,
  className = "",
  showEmpty = true,
  maxStars = MAX_RATING,
  size,
  halfStarMode = "path",
}: StarProps) => {
  const clipIdPrefix = React.useId();
  const normalizedMaxStars = Math.max(1, Math.floor(Number(maxStars) || MAX_RATING));
  const safeRating = Math.max(
    0,
    Math.min(normalizedMaxStars, Number(rating) || 0),
  );

  const displayRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating - fullStars >= 0.5;
  const isZeroRating = safeRating === 0;

  const starSizeStyle =
    size !== undefined
      ? ({
          "--star-size": typeof size === "number" ? `${size}px` : size,
        } as React.CSSProperties)
      : undefined;

  const fullPath =
    "M11.7515 0L15.2521 7.53796L23.5029 8.53794L17.4157 14.1966L19.0143 22.3526L11.7515 18.3119L4.48868 22.3526L6.08728 14.1966L2.00272e-05 8.53794L8.25081 7.53796L11.7515 0Z";

  const halfPath =
    "M4.48866 22.3526L11.7515 18.3119V0L8.25079 7.53796L0 8.53793L6.08726 14.1966L4.48866 22.3526Z";

  return (
    <>
      {Array.from({ length: normalizedMaxStars }, (_, index) => {
        const isFull = !isZeroRating && index < fullStars;
        const isHalf = !isZeroRating && index === fullStars && hasHalfStar;

        if (!isZeroRating && !isFull && !isHalf && !showEmpty) {
          return null;
        }

        const stateClass =
          isFull || isHalf ? `${className}--active` : `${className}--empty`;
        const clipId = `${clipIdPrefix}-${index}-half-clip`;

        return (
          <span
            key={`${className || "star"}-${index}`}
            className={`star-item ${className ? `${className}__item` : ""}`}
            style={starSizeStyle}
            aria-hidden="true"
          >
            {isHalf && halfStarMode === "clip" ? (
              <svg
                className={[className, stateClass].filter(Boolean).join(" ")}
                viewBox="0 0 24 23"
                focusable="false"
              >
                <defs>
                  <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="12" height="23" />
                  </clipPath>
                </defs>
                <path d={fullPath} clipPath={`url(#${clipId})`} />
              </svg>
            ) : isHalf ? (
              <svg
                className={[className, stateClass].filter(Boolean).join(" ")}
                viewBox="0 0 12 23"
                focusable="false"
              >
                <path d={halfPath} />
              </svg>
            ) : (
              <svg
                className={[className, stateClass].filter(Boolean).join(" ")}
                viewBox="0 0 24 23"
                focusable="false"
              >
                <path d={fullPath} />
              </svg>
            )}
          </span>
        );
      })}
    </>
  );
};
