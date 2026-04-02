import React from "react";
import { ReviewCardSkeleton } from "@/components/organisms/ReviewCardSkeleton";

interface ProductReviewsListSkeletonProps {
  count?: number;
}

/**
 * ProductReviewsListSkeleton - Loading state wrapper for the reviews list.
 */
export const ProductReviewsListSkeleton: React.FC<
  ProductReviewsListSkeletonProps
> = ({ count = 6 }) => {
  return (
    <ul id="reviews-list" className="reviews__list js-reviews-list">
      {Array.from({ length: count }, (_, index) => (
        <ReviewCardSkeleton key={`skeleton-${index}`} />
      ))}
    </ul>
  );
};
