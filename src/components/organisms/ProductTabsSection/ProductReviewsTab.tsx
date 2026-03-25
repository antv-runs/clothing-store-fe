import React from "react";
import "./ProductReviewsTab.scss";
import type { Review } from "../../../types/review";
import { ProductReviewsHeader } from "./ProductReviewsHeader.tsx";
import { ProductReviewsList } from "./ProductReviewsList.tsx";

interface ProductReviewsTabProps {
  reviews: Review[];
  reviewCount: number;
}

/**
 * ProductReviewsTab - Reviews tab content section.
 */
export const ProductReviewsTab: React.FC<ProductReviewsTabProps> = ({
  reviews,
  reviewCount,
}) => {
  return (
    <section
      id="tc-reviews"
      data-tab-content="tc-reviews"
      className="reviews products-tabs__content js-products-tabs__content products-tabs__content--active"
    >
      <ProductReviewsHeader reviewCount={reviewCount} />
      <ProductReviewsList reviews={reviews} />

      <div className="reviews__load-more-wrapper">
        <button
          id="reviews-load-more"
          className="reviews__load-more js-reviews-load-more"
        >
          Load More Reviews
        </button>
      </div>
    </section>
  );
};
