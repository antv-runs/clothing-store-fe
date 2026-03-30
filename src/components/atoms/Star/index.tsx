import React from "react";

interface StarProps {
  rating: number;
  className?: string;
  showEmpty?: boolean;
  maxStars?: number;
  size?: number | string;
}

export const Star: React.FC<StarProps> = ({
  rating,
  className = "",
  showEmpty = true,
  maxStars = 5,
  size,
}) => {
  const normalizedMaxStars = Math.max(1, Math.floor(Number(maxStars) || 5));
  const safeRating = Math.max(
    0,
    Math.min(normalizedMaxStars, Number(rating) || 0),
  );

  const displayRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating - fullStars >= 0.5;

  const starSizeStyle =
    size !== undefined
      ? ({
          "--star-size": typeof size === "number" ? `${size}px` : size,
        } as React.CSSProperties)
      : undefined;

  const fullPath =
    "M7.35521 0L9.54627 4.718L14.7104 5.34389L10.9004 8.88566L11.901 13.9905L7.35521 11.4614L2.80942 13.9905L3.80999 8.88566L-2.3365e-05 5.34389L5.16414 4.718L7.35521 0Z";

  const halfPath =
    "M2.80945 13.9905L7.35523 11.4614V0L5.16416 4.718L0 5.34389L3.81001 8.88566L2.80945 13.9905Z";

  return (
    <>
      {Array.from({ length: normalizedMaxStars }, (_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;

        if (!isFull && !isHalf && !showEmpty) {
          return null;
        }

        const stateClass =
          isFull || isHalf ? `${className}--active` : `${className}--empty`;

        return (
          <span
            key={`${className || "star"}-${index}`}
            className={`star-item ${className ? `${className}__item` : ""}`}
            style={starSizeStyle}
            aria-hidden="true"
          >
            {isHalf ? (
              <svg
                className={[className, stateClass].filter(Boolean).join(" ")}
                viewBox="0 0 8 14"
                focusable="false"
              >
                <path d={halfPath} />
              </svg>
            ) : (
              <svg
                className={[className, stateClass].filter(Boolean).join(" ")}
                viewBox="0 0 15 14"
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
