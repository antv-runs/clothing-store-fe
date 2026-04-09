import React from "react";
import { Rating } from "@/components/atoms/Rating";
import { Star } from "@/components/atoms/Star";
import { Text } from "@/components/atoms/Text";
import "./index.scss";

interface RatingDisplayProps {
  rating: number;
  maxStars?: number;
  showEmpty?: boolean;
}

/**
 * RatingDisplay molecule - Combines stars and rating value
 * Used for product overview and other rating displays
 */
export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  maxStars = 5,
  showEmpty = false,
}) => {
  const normalizedMaxStars = Math.max(1, Math.floor(Number(maxStars) || 5));
  const safeRating = Math.max(
    0,
    Math.min(normalizedMaxStars, Number(rating) || 0),
  );

  return (
    <div
      className="product-info__rating"
      aria-label={`${safeRating.toFixed(1)} out of ${normalizedMaxStars} stars`}
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
