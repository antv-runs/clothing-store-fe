import React from "react";
import { ReviewCardSkeleton } from "@/components/molecules/ReviewCardSkeleton";

interface ProductReviewsListSkeletonProps {
  count?: number;
}

/**
 * ProductReviewsListSkeleton - Loading state items for the reviews list.
 */
export const ProductReviewsListSkeleton: React.FC<
  ProductReviewsListSkeletonProps
> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ReviewCardSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
};
