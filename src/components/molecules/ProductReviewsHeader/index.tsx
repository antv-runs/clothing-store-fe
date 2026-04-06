import React from "react";
import { Heading } from "@/components/atoms/Heading";
import "./index.scss";
import { ProductReviewsFilter } from "@/components/molecules/ProductReviewsFilter";

interface ProductReviewsHeaderProps {
  reviewCount: number;
  selectedRating: string;
  selectedSort: "latest" | "oldest" | "highest";
  onRatingChange: (value: string) => void;
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  isLoading?: boolean;
  onWriteReview: () => void;
}

/**
 * ProductReviewsHeader - Reviews tab heading and controls.
 */
export const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({
  reviewCount,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  isLoading = false,
  onWriteReview,
}) => {
  return (
    <div className="reviews__header">
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
