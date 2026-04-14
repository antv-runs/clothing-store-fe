import { ReviewCardSkeleton } from "@/components/molecules/ReviewCardSkeleton";

type ProductReviewsListSkeletonProps = {
  count?: number;
};

/**
 * ProductReviewsListSkeleton - Loading state items for the reviews list.
 */
export const ProductReviewsListSkeleton = ({ count = 6 }: ProductReviewsListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ReviewCardSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
};
