import React from "react";
import "./WriteReviewModal.scss";
import IconButton from "@/components/atoms/IconButton/IconButton";

/**
 * WriteReviewModal - Static review modal markup.
 * Preserves existing classes and DOM structure.
 */
export const WriteReviewModal: React.FC = () => {
  return (
    <div
      id="write-review-modal"
      className="review-modal js-review-modal"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
    >
      <div className="review-modal__backdrop js-review-modal-close"></div>
      <div className="review-modal__dialog" role="document">
        <div className="review-modal__header">
          <h3 id="write-review-title" className="review-modal__title">
            Write a Review
          </h3>
          <IconButton
            svgName="icn_close"
            className="review-modal__close js-review-modal-close"
            ariaLabel="Close review form"
            iconWidth={16}
            iconHeight={16}
          />
        </div>

        <form className="review-modal__form js-review-modal-form">
          <label className="review-modal__field">
            <span>Username</span>
            <input
              type="text"
              className="js-review-username"
              name="username"
              autoComplete="name"
              disabled
            />
          </label>

          <label className="review-modal__field">
            <span>Comment</span>
            <textarea
              className="js-review-comment"
              name="comment"
              rows={4}
              placeholder="Share your thoughts about this product"
              required
            ></textarea>
          </label>

          <div className="review-modal__field review-modal__field--rating">
            <span>Star Rating</span>
            <div
              className="review-modal__rating-picker js-review-rating-picker"
              aria-label="Select a rating from 1 to 5 stars"
            >
              <div className="review-modal__rating-stars js-review-rating-stars"></div>
              <div
                className="review-modal__rating-hitzones js-review-rating-hitzones"
                aria-hidden="false"
              ></div>
            </div>
            <p className="review-modal__rating-value js-review-rating-value">
              5.0/5
            </p>
          </div>

          <div className="review-modal__actions">
            <button
              type="button"
              className="review-modal__button review-modal__button--cancel js-review-modal-close"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="review-modal__button js-review-modal-submit"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
