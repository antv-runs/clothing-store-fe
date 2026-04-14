import { MAX_RATING } from "@/const/config";
import { clamp, toNumber } from "@/utils/number";
import clsx from "clsx";

type RatingProps = {
  rating: number | string;
  className?: string;
  id?: string;
};

/**
 * Rating atom - Strict implementation for displaying a numerical rating.
 */
export const Rating = ({ rating, className, id }: RatingProps) => {
  const safeRating = clamp(toNumber(rating), 0, MAX_RATING);
  const displayValue = safeRating.toFixed(1);

  return (
    <span id={id} className={clsx("rating", className)}>
      {displayValue}/<span>{MAX_RATING}</span>
    </span>
  );
};

