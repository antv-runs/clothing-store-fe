import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ProductReviewsListSkeleton } from "@/components/molecules/ProductReviewsListSkeleton";

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
  return (
    <ul id="reviews-list" className="reviews__list js-reviews-list">
      {isLoading ? (
        <ProductReviewsListSkeleton />
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
