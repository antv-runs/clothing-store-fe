import React from "react";
import { Star } from "../../atoms/Star/Star";
import { Rating } from "../../atoms/Rating/Rating";

interface RatingDisplayProps {
  rating: number;
  starClassName?: string;
  showEmpty?: boolean;
}

/**
 * RatingDisplay molecule - Combines stars and rating value
 * Used for product overview and other rating displays
 */
export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  starClassName = "review-card__star",
  showEmpty = false,
}) => {
  return (
    <div className="product-overview__rating js-product-rating-section">
      <div id="product-rating-stars" className="js-product-rating-stars">
        <Star rating={rating} className={starClassName} showEmpty={showEmpty} />
      </div>
      <p
        id="product-rating-text"
        className="product-overview__rating-text js-product-rating-text"
      >
        <Rating rating={rating} />
      </p>
    </div>
  );
};
