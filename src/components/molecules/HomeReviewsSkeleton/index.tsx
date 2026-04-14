import type { HTMLAttributes } from "react";
import { Skeleton } from "@/components/atoms/Skeleton";
import clsx from "clsx";
import "./index.scss";

type HomeReviewsSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  count?: number;
};

/**
 * HomeReviewsSkeleton - Loading state shaped for HomeReviews horizontal carousel.
 */
export const HomeReviewsSkeleton = ({
  count = 4,
  className,
  ...rest
}: HomeReviewsSkeletonProps) => {
  return (
    <div className={clsx("home-reviews__viewport", className)} role="status" aria-live="polite" {...rest}>
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
