import React from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
}

/**
 * ProductReviews organism - Display and filter reviews
 * Shows rating filter buttons and review list
 */
export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  selectedRating,
  onRatingChange,
}) => {
  // Calculate rating counts
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  // Filter reviews
  const filteredReviews =
    selectedRating === null
      ? reviews
      : reviews.filter((r) => r.rating === selectedRating);

  return (
    <div className="reviews-container">
      <div className="reviews-filter">
        <h3>Filter by Rating</h3>
        <button
          className={`rating-filter-btn ${selectedRating === null ? "active" : ""}`}
          onClick={() => onRatingChange(null)}
        >
          All ({reviews.length})
        </button>
        {([5, 4, 3, 2, 1] as const).map((rating) => (
          <button
            key={rating}
            className={`rating-filter-btn ${selectedRating === rating ? "active" : ""}`}
            onClick={() =>
              onRatingChange(selectedRating === rating ? null : rating)
            }
          >
            {rating} ★ ({ratingCounts[rating]})
          </button>
        ))}
      </div>

      <div className="reviews-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-author">{review.author}</span>
                <span className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <span className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews found.</p>
        )}
      </div>
    </div>
  );
};
