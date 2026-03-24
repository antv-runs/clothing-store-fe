import React from "react";

interface StarProps {
  rating: number;
  className: string;
  showEmpty?: boolean;
}

/**
 * Star component - renders stars with proper CSS modifiers
 * Supports full stars, half stars, and optionally empty stars
 * Rounding to nearest 0.5 matches original design behavior
 */
export const Star: React.FC<StarProps> = ({
  rating,
  className,
  showEmpty = true,
}) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  // Round to nearest 0.5 like old implementation
  const displayRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating - fullStars >= 0.5;

  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;

        // Skip rendering empty stars if showEmpty is false
        if (!isFull && !isHalf && !showEmpty) {
          return null;
        }

        // Add --active modifier class for filled/half stars
        const activeModifier = isFull || isHalf ? ` ${className}--active` : "";
        const star = isFull ? "★" : isHalf ? "⯪" : "☆";

        return (
          <span
            key={`${className}-${index}`}
            className={`${className}${activeModifier}`}
            aria-hidden="true"
          >
            {star}
          </span>
        );
      }).filter(Boolean)}
    </>
  );
};
