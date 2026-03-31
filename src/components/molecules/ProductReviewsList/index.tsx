import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { ReviewCard } from "@/components/organisms/ReviewCard";

interface ProductReviewsListProps {
  reviews: Review[];
  isLoading?: boolean;
}

/**
 * ProductReviewsList - Reviews list content inside reviews tab.
 */
export const ProductReviewsList: React.FC<ProductReviewsListProps> = ({
  reviews,
  isLoading = false,
}) => {
  const renderSkeletonItems = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <li
        key={`skeleton-${index}`}
        className="reviews__item review-card reviews__skeleton"
        aria-hidden="true"
      >
        <div className="review-card__meta">
          <div className="reviews__skeleton-line reviews__skeleton-line--stars"></div>
          <div className="reviews__skeleton-line reviews__skeleton-line--icon"></div>
        </div>
        <div className="reviews__skeleton-line reviews__skeleton-line--title"></div>
        <div className="reviews__skeleton-line reviews__skeleton-line--text"></div>
        <div className="reviews__skeleton-line reviews__skeleton-line--text reviews__skeleton-line--text-short"></div>
        <div className="reviews__skeleton-line reviews__skeleton-line--footer"></div>
      </li>
    ));
  };

  return (
    <ul id="reviews-list" className="reviews__list js-reviews-list">
      {isLoading ? (
        renderSkeletonItems()
      ) : reviews.length === 0 ? (
        <li className="reviews__item review-card">
          <p className="review-card__content">No reviews yet.</p>
        </li>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </ul>
  );
};
