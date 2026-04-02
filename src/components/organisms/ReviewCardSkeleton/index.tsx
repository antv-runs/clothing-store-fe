import React from "react";
import "./index.scss";
import { Skeleton } from "@/components/atoms/Skeleton";

/**
 * ReviewCardSkeleton - Placeholder shell for a single review card.
 */
export const ReviewCardSkeleton: React.FC = () => {
  return (
    <li
      className="reviews__item review-card reviews__skeleton"
      aria-hidden="true"
    >
      <div className="review-card__meta">
        <Skeleton
          className="reviews__skeleton-line reviews__skeleton-line--stars"
          variant="rect"
        />
        <Skeleton
          className="reviews__skeleton-line reviews__skeleton-line--icon"
          variant="circle"
        />
      </div>
      <Skeleton
        className="reviews__skeleton-line reviews__skeleton-line--title"
        variant="rect"
      />
      <Skeleton
        className="reviews__skeleton-line reviews__skeleton-line--text"
        variant="rect"
      />
      <Skeleton
        className="reviews__skeleton-line reviews__skeleton-line--text reviews__skeleton-line--text-short"
        variant="rect"
      />
      <Skeleton
        className="reviews__skeleton-line reviews__skeleton-line--footer"
        variant="rect"
      />
    </li>
  );
};
