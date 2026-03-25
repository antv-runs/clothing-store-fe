import React from "react";

interface StarProps {
  rating: number;
  className: string;
  showEmpty?: boolean;
  maxStars?: number;
}

/**
 * Star component - renders inline SVG stars with full/half/empty states.
 * Uses the same nearest-0.5 rounding behavior as the legacy product page.
 */
export const Star: React.FC<StarProps> = ({
  rating,
  className,
  showEmpty = true,
  maxStars = 5,
}) => {
  const normalizedMaxStars = Math.max(1, Math.floor(Number(maxStars) || 5));
  const safeRating = Math.max(
    0,
    Math.min(normalizedMaxStars, Number(rating) || 0),
  );

  const displayRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating - fullStars >= 0.5;

  return (
    <>
      {Array.from({ length: normalizedMaxStars }, (_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;

        if (!isFull && !isHalf && !showEmpty) {
          return null;
        }

        const activeModifier = isFull || isHalf ? ` ${className}--active` : "";
        const fullPath =
          "M10.737 0L13.9355 6.8872L21.4739 7.80085L15.9122 12.971L17.3728 20.4229L10.737 16.731L4.10121 20.4229L5.56179 12.971L0 7.80085L7.53855 6.8872L10.737 0Z";
        const halfPath =
          "M4.10115 20.4229L10.7369 16.731V0L7.53849 6.8872L0 7.80085L5.56174 12.971L4.10115 20.4229Z";

        return (
          <svg
            key={`${className}-${index}`}
            className={`${className}${activeModifier}`}
            aria-hidden="true"
            viewBox="0 0 22 21"
            focusable="false"
          >
            <path d={isHalf ? halfPath : fullPath} />
          </svg>
        );
      }).filter(Boolean)}
    </>
  );
};
