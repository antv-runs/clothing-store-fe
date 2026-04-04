import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { Button } from "@/components/atoms/Button";
import { ProductReviewsHeader } from "@/components/molecules/ProductReviewsHeader";
import { ProductReviewsList } from "@/components/molecules/ProductReviewsList";

interface ProductReviewsTabProps {
  reviews: Review[];
  reviewCount: number;
  isActive: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  selectedRating: string;
  selectedSort: "latest" | "oldest" | "highest";
  onRatingChange: (value: string) => void;
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  onLoadMore: () => void;
  error?: string | null;
  onWriteReview: () => void;
}

/**
 * ProductReviewsTab - Reviews tab content section.
 */
export const ProductReviewsTab: React.FC<ProductReviewsTabProps> = ({
  reviews,
  reviewCount,
  isActive,
  isLoading,
  isLoadingMore,
  hasMore,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  onLoadMore,
  error,
  onWriteReview,
}) => {
  return (
    <section
      id="tc-reviews"
      data-tab-content="tc-reviews"
      role="tabpanel"
      aria-labelledby="tab-tc-reviews"
      aria-hidden={!isActive}
      className={`reviews products-tabs__content js-products-tabs__content${
        isActive ? " products-tabs__content--active" : ""
      }`}
    >
      <ProductReviewsHeader
        reviewCount={reviewCount}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onRatingChange={onRatingChange}
        onSortChange={onSortChange}
        isLoading={isLoading}
        onWriteReview={onWriteReview}
      />

      {error && !isLoading && (
        <div className="reviews__status reviews__status--error" role="alert">
          {error}
        </div>
      )}

      <ProductReviewsList reviews={reviews} isLoading={isLoading} />

      <div className="reviews__load-more-wrapper">
        <Button
          unstyled
          id="reviews-load-more"
          className="reviews__load-more js-reviews-load-more"
          type="button"
          onClick={onLoadMore}
          isLoading={isLoadingMore}
          loadingText="Loading..."
          disabled={!hasMore || isLoading || reviews.length === 0}
          aria-label="Load more reviews"
        >
          Load More Reviews
        </Button>
      </div>
    </section>
  );
};
