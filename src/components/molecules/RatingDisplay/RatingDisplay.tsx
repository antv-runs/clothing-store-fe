import React from "react";
import { Star } from "../../atoms/Star/Star";
import { Rating } from "../../atoms/Rating/Rating";

interface RatingDisplayProps {
  rating: number;
  maxStars?: number;
  starClassName?: string;
  showEmpty?: boolean;
}

/**
 * RatingDisplay molecule - Combines stars and rating value
 * Used for product overview and other rating displays
 */
export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  maxStars = 5,
  starClassName = "product-info__star",
  showEmpty = false,
}) => {
  const safeRating = Math.max(0, Math.min(maxStars, Number(rating) || 0));

  return (
    <div
      className="product-info__rating js-product-rating-section"
      aria-label={`${safeRating.toFixed(1)} out of ${maxStars} stars`}
    >
      <div id="product-rating-stars" className="js-product-rating-stars">
        <Star
          rating={safeRating}
          className={starClassName}
          showEmpty={showEmpty}
          maxStars={maxStars}
        />
      </div>
      <p
        id="product-rating-text"
        className="product-info__rating-text js-product-rating-text"
      >
        <Rating rating={safeRating} />
      </p>
    </div>
  );
};
