import React from "react";

interface ProductRatingProps {
  averageRating: number;
  totalReviews: number;
}

/**
 * ProductRating molecule - Average rating display
 * Shows star rating and review count
 */
export const ProductRating: React.FC<ProductRatingProps> = ({
  averageRating,
  totalReviews,
}) => {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;

  return (
    <div className="product-rating">
      <div className="rating-stars">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <span key={i}>★</span>;
          } else if (i === fullStars && hasHalfStar) {
            return <span key={i}>◐</span>;
          } else {
            return <span key={i}>☆</span>;
          }
        })}
      </div>
      <span className="rating-value">{averageRating.toFixed(1)}</span>
      <span className="rating-count">({totalReviews} reviews)</span>
    </div>
  );
};
