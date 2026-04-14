import type { HTMLAttributes } from "react";
import { Heading } from "@/components/atoms/Heading";
import "./index.scss";
import { ProductReviewsFilter } from "@/components/molecules/ProductReviewsFilter";
import clsx from "clsx";
import type { ReviewSort } from "@/types/review";

type ProductReviewsHeaderProps = HTMLAttributes<HTMLDivElement> & {
  reviewCount: number;
  selectedRating: string;
  selectedSort: ReviewSort;
  onRatingChange: (value: string) => void;
  onSortChange: (value: ReviewSort) => void;
  isLoading?: boolean;
  onWriteReview: () => void;
};

/**
 * ProductReviewsHeader - Reviews tab heading and controls.
 */
export const ProductReviewsHeader = ({
  reviewCount,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  isLoading = false,
  onWriteReview,
  className,
  ...rest
}: ProductReviewsHeaderProps) => {
  return (
    <div className={clsx("reviews__header", className)} {...rest}>
      <Heading as="h2" className="reviews__title">
        All Reviews
        <span>
          ({reviewCount})
        </span>
      </Heading>

      <ProductReviewsFilter
        selectedRating={selectedRating}
        onRatingChange={onRatingChange}
        selectedSort={selectedSort}
        onSortChange={onSortChange}
        isDisabled={isLoading}
        onWriteReview={onWriteReview}
      />
    </div>
  );
};
