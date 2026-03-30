import React from "react";

interface RatingProps {
  rating: number;
  className?: string;
}

/**
 * Rating atom - Displays rating value as "X.X/5"
 */
export const Rating: React.FC<RatingProps> = ({ rating, className }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const displayValue = safeRating.toFixed(1);

  if (className) {
    return (
      <span className={className}>
        {displayValue}/<span>5</span>
      </span>
    );
  }

  return (
    <span>
      {displayValue}/<span>5</span>
    </span>
  );
};
