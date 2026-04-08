import React from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import type { ListErrorKind } from "@/types/listState";
import { Button } from "@/components/atoms/Button";
import { ProductReviewsHeader } from "@/components/molecules/ProductReviewsHeader";
import { ProductReviewsList } from "@/components/molecules/ProductReviewsList";
import { ProductReviewsListSkeleton } from "@/components/molecules/ProductReviewsListSkeleton";
import { ListStateWrapper } from "@/components/molecules/ListStateWrapper";

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
  errorKind?: ListErrorKind | null;
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
  errorKind,
  onWriteReview,
}) => {
  const isEmpty = !isLoading && !error && reviews.length === 0;
  const loadingContent = (
    <ul className="reviews__list" aria-busy="true" aria-live="polite">
      <ProductReviewsListSkeleton />
    </ul>
  );
  const emptyContent = (
    <ul className="reviews__list" aria-live="polite">
      <li className="reviews__item review-card">
        <p className="review-card__content">No reviews yet.</p>
      </li>
    </ul>
  );

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

      <ListStateWrapper
        isLoading={isLoading}
        isRetrying={isRetrying}
        isEmpty={isEmpty}
        error={error || null}
        errorKind={errorKind || null}
        onRetry={onRetry}
        loadingContent={loadingContent}
        emptyContent={emptyContent}
      >
        <>
          <ProductReviewsList reviews={reviews} />

          <div className="reviews__load-more-wrapper">
            <Button
              variant="secondary"
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
      </ListStateWrapper>
    </section>
  );
};
