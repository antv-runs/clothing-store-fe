import type { HTMLAttributes } from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import clsx from "clsx";

type ProductReviewsListProps = HTMLAttributes<HTMLUListElement> & {
  reviews: Review[];
};

/**
 * ProductReviewsList - Reviews list content inside reviews tab.
 */
export const ProductReviewsList = ({
  reviews,
  className,
  ...rest
}: ProductReviewsListProps) => {
  return (
    <ul className={clsx("reviews__list", className)} {...rest}>
      {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </ul>
  );
};
