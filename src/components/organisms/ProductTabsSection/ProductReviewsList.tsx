import React from "react";
import "./ProductReviewsList.scss";
import type { Review } from "../../../types/review";
import { ReviewCard } from "../ReviewCard/ReviewCard.tsx";

interface ProductReviewsListProps {
  reviews: Review[];
}

/**
 * ProductReviewsList - Reviews list content inside reviews tab.
 */
export const ProductReviewsList: React.FC<ProductReviewsListProps> = ({
  reviews,
}) => {
  return (
    <ul id="reviews-list" className="reviews__list js-reviews-list">
      {reviews.length === 0 ? (
        <li className="reviews__item review-card">
          <p className="review-card__content">No reviews yet.</p>
        </li>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </ul>
  );
};
