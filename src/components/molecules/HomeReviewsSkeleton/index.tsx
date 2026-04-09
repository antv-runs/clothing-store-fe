import React from "react";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

interface HomeReviewsSkeletonProps {
  count?: number;
}

/**
 * HomeReviewsSkeleton - Loading state shaped for HomeReviews horizontal carousel.
 */
export const HomeReviewsSkeleton: React.FC<HomeReviewsSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <div className="home-reviews__viewport" role="status" aria-live="polite">
      <ul
        className="home-reviews__track reviews__list home-reviews__track--loading"
        aria-busy="true"
        aria-label="Loading customer reviews"
      >
        {Array.from({ length: count }, (_, index) => (
          <li
            key={`home-reviews-skeleton-${index}`}
            className="reviews__item review-card home-reviews-skeleton__item"
            aria-hidden="true"
          >
            <Skeleton variant="line" className="home-reviews-skeleton__stars" />

            <Skeleton variant="line" className="home-reviews-skeleton__title" />
            <Skeleton variant="line" className="home-reviews-skeleton__text" />
            <Skeleton variant="line" className="home-reviews-skeleton__text" />
            <Skeleton variant="line" className="home-reviews-skeleton__text" />
          </li>
        ))}
      </ul>
    </div>
  );
};
