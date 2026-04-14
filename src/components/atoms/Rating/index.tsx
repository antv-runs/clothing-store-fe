import type { HTMLAttributes } from "react";
import { MAX_RATING } from "@/const/ui";
import clsx from "clsx";
import "./index.scss";

type RatingProps = HTMLAttributes<HTMLSpanElement> & {
  rating: number;
};

export const Rating = ({ rating, className, ...rest }: RatingProps) => {
  const safeRating = Math.max(0, Math.min(MAX_RATING, Number(rating) || 0));
  const displayValue = safeRating.toFixed(1);

  return (
    <span className={clsx("rating", className)} {...rest}>
      {displayValue}/<span>{MAX_RATING}</span>
    </span>
  );
};
