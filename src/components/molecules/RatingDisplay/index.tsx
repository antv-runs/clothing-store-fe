import React from "react";
import { Rating } from "@/components/atoms/Rating";
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

  const displayRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating - fullStars >= 0.5;

  const fullPath =
    "M11.7515 0L15.2521 7.53796L23.5029 8.53794L17.4157 14.1966L19.0143 22.3526L11.7515 18.3119L4.48868 22.3526L6.08728 14.1966L2.00272e-05 8.53794L8.25081 7.53796L11.7515 0Z";
  const halfPath =
    "M4.48866 22.3526L11.7515 18.3119V0L8.25079 7.53796L0 8.53793L6.08726 14.1966L4.48866 22.3526Z";

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < normalizedMaxStars; i++) {
      const isFull = i < fullStars;
      const isHalf = i === fullStars && hasHalfStar;
      const isEmpty = !isFull && !isHalf;

      if (isEmpty && !showEmpty) {
        continue;
      }

      const isActive = isFull || isHalf;
      const variantClass = isFull
        ? "rating-display__star--full"
        : isHalf
          ? "rating-display__star--half"
          : "rating-display__star--empty";

      stars.push(
        <span
          key={`rating-star-${i}`}
          className="rating-display__star-wrapper"
          aria-hidden="true"
        >
          <svg
            className={`rating-display__star ${variantClass} ${isActive ? "rating-display__star--active" : ""}`}
            viewBox={isHalf ? "0 0 12 23" : "0 0 24 23"}
            focusable="false"
          >
            <path d={isHalf ? halfPath : fullPath} />
          </svg>
        </span>,
      );
    }

    return stars;
  };

  return (
    <div
      className="product-info__rating"
      aria-label={`${safeRating.toFixed(1)} out of ${normalizedMaxStars} stars`}
    >
      <div
        className="rating-display__stars"
      >
        {renderStars()}
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
