import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { Button } from "@/components/atoms/Button";
import { RetryState } from "@/components/molecules/RetryState";
import { ProductReviewsHeader } from "@/components/molecules/ProductReviewsHeader";
import { ProductReviewsList } from "@/components/molecules/ProductReviewsList";

interface ProductReviewsTabProps {
  panelRef?: (el: HTMLElement | null) => void;
  reviews: Review[];
  reviewCount: number;
  isActive: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRetrying: boolean;
  hasMore: boolean;
  selectedRating: string;
  selectedSort: "latest" | "oldest" | "highest";
  onRatingChange: (value: string) => void;
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  onLoadMore: () => void;
  onRetry: () => void;
  error?: string | null;
  onWriteReview: () => void;
}

/**
 * ProductReviewsTab - Reviews tab content section.
 */
export const ProductReviewsTab: React.FC<ProductReviewsTabProps> = ({
  panelRef,
  reviews,
  reviewCount,
  isActive,
  isLoading,
  isLoadingMore,
  isRetrying,
  hasMore,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  onLoadMore,
  onRetry,
  error,
  onWriteReview,
}) => {
  return (
    <section
      id="tc-reviews"
      ref={panelRef}
      data-tab-content="tc-reviews"
      role="tabpanel"
      aria-labelledby="tab-tc-reviews"
      aria-hidden={!isActive}
      className={`reviews products-tabs__content${isActive ? " products-tabs__content--active" : ""}`}
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

      {error && !isLoading ? (
        <RetryState
          message={error}
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      ) : (
        <>
          <ProductReviewsList reviews={reviews} isLoading={isLoading} />

          <div className="reviews__load-more-wrapper">
            <Button
              unstyled
              className="reviews__load-more"
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
        </>
      )}
    </section>
  );
};
