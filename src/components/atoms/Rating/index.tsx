import React from "react";
import { MAX_RATING } from "@/const/ui";

interface RatingProps {
  rating: number;
  className?: string;
}

/**
 * Rating atom - Displays rating value as "X.X/5"
 */
export const Rating: React.FC<RatingProps> = ({ rating, className }) => {
  const safeRating = Math.max(0, Math.min(MAX_RATING, Number(rating) || 0));
  const displayValue = safeRating.toFixed(1);

  if (className) {
    return (
      <span className={className}>
        {displayValue}/<span>{MAX_RATING}</span>
      </span>
    );
  }

  return (
    <span>
      {displayValue}/<span>{MAX_RATING}</span>
    </span>
  );
};
