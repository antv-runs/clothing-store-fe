import type { HTMLAttributes } from "react";
import { Rating } from "@/components/atoms/Rating";
import { Star } from "@/components/atoms/Star";
import { Text } from "@/components/atoms/Text";
import { MAX_RATING } from "@/const/config";
import clsx from "clsx";
import "./index.scss";

type RatingDisplayProps = HTMLAttributes<HTMLDivElement> & {
  rating: number;
  maxStars?: number;
  showEmpty?: boolean;
};

/**
 * RatingDisplay molecule - Combines stars and rating value
 * Used for product overview and other rating displays
 */
export const RatingDisplay = ({
  rating,
  maxStars = MAX_RATING,
  showEmpty = false,
  className,
  ...rest
}: RatingDisplayProps) => {
  const normalizedMaxStars = Math.max(1, Math.floor(Number(maxStars) || MAX_RATING));
  const safeRating = Math.max(
    0,
    Math.min(normalizedMaxStars, Number(rating) || 0),
  );

  return (
    <div
      className={clsx("product-info__rating", className)}
      aria-label={`${safeRating.toFixed(1)} out of ${normalizedMaxStars} stars`}
      {...rest}
    >
      <div
        className="rating-display__stars"
      >
        <Star
          rating={safeRating}
          className="rating-display__star"
          showEmpty={showEmpty}
          maxStars={normalizedMaxStars}
        />
      </div>
      <Text
        as="p"
        className="rating-display__text product-info__rating-text"
      >
        <Rating rating={safeRating} />
      </Text>
    </div>
  );
};

