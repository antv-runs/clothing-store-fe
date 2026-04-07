import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { ReviewCard } from "@/components/molecules/ReviewCard";

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
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </ul>
  );
};
