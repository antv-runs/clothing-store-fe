import React from "react";
import "./ReviewCard.scss";
import { Star } from "../../atoms/Star/Star";
import { ReviewMeta } from "~/components/molecules/ReviewMeta/ReviewMeta";
import { formatDate } from "../../../utils/formatters";
import type { Review } from "../../../types/review";

interface ReviewCardProps {
  review: Review;
}

/**
 * ReviewCard organism - Individual review card
 * Displays reviewer info, rating, content, and date
 */
export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <li className="reviews__item review-card" data-stars={review.ratingStar}>
      <div className="review-card__meta">
        <div className="review-card__stars">
          <Star
            rating={review.ratingStar}
            className="review-card__star"
            showEmpty={false}
          />
        </div>
        <button
          className="review-card__more-btn"
          aria-label="More actions"
          aria-haspopup="menu"
        />
      </div>
      <ReviewMeta name={review.name} isVerified={review.isVerified} />
      <p className="review-card__content">{review.desc}</p>
      <p className="review-card__footer">
        Posted on {formatDate(review.createdAt)}
      </p>
    </li>
  );
};
