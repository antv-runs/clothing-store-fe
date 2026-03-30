import React from "react";
import { Heading } from "@/components/atoms";
import "./ProductReviewsHeader.scss";
import { ProductReviewsFilter } from "./ProductReviewsFilter.tsx";

interface ProductReviewsHeaderProps {
  reviewCount: number;
}

/**
 * ProductReviewsHeader - Reviews tab heading and controls.
 */
export const ProductReviewsHeader: React.FC<ProductReviewsHeaderProps> = ({
  reviewCount,
}) => {
  return (
    <div className="reviews__header">
      <Heading as="h2" className="reviews__title">
        All Reviews
        <span id="reviews-count" className="js-reviews-count">
          ({reviewCount})
        </span>
      </Heading>

      <ProductReviewsFilter />
    </div>
  );
};
