import type { HTMLAttributes } from "react";
import "./index.scss";
import { Star } from "@/components/atoms/Star";
import { IconButton } from "@/components/atoms/IconButton";
import { ReviewMeta } from "@/components/molecules/ReviewMeta";
import { formatDate } from "@/utils/formatters";
import type { Review } from "@/types/review";
import { Text } from "@/components/atoms/Text";
import clsx from "clsx";

type ReviewCardProps = HTMLAttributes<HTMLLIElement> & {
  review: Review;
};

/**
 * ReviewCard molecule - Individual review card
 * Displays reviewer info, rating, content, and date
 */
export const ReviewCard = ({ review, className, ...rest }: ReviewCardProps) => {
  return (
    <li className={clsx("reviews__item review-card", className)} data-stars={review.ratingStar} {...rest}>
      <div className="review-card__meta">
        <div className="review-card__stars">
          <Star
            rating={review.ratingStar}
            className="review-card__star"
            showEmpty={false}
          />
        </div>
        <IconButton
          svgName="icn_review_more"
          className="review-card__more-btn"
          ariaLabel="More actions"
          aria-haspopup="menu"
          iconWidth={25}
          iconHeight={25}
        />
      </div>
      <ReviewMeta name={review.name} isVerified={review.isVerified} />
      <Text as="p" className="review-card__content">
        "{review.desc}"
      </Text>
      <Text as="p" className="review-card__footer">
        Posted on {formatDate(review.createdAt)}
      </Text>
    </li>
  );
};
