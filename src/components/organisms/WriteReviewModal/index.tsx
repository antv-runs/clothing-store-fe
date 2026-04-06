import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./index.scss";
import { IconButton } from "@/components/atoms/IconButton";
import { Star } from "@/components/atoms/Star";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";

type ReviewSubmission = {
  username: string;
  comment: string;
  stars: number;
};

interface WriteReviewModalProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: ReviewSubmission) => void | Promise<void>;
}

const DEFAULT_RATING = 5;

const reviewModalSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  comment: z.string().trim().min(1, "Comment is required."),
  stars: z.number().min(0.5).max(5),
});

type ReviewModalFormValues = z.infer<typeof reviewModalSchema>;

/**
 * WriteReviewModal - Static review modal markup.
 * Preserves existing classes and DOM structure.
 */
export const WriteReviewModal = ({
  isOpen,
  isSubmitting = false,
  onClose,
  onSubmit,
}: WriteReviewModalProps) => {
  const { control, handleSubmit, reset } = useForm<ReviewModalFormValues>({
    resolver: zodResolver(reviewModalSchema),
    defaultValues: {
      username: "",
      comment: "",
      stars: DEFAULT_RATING,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        username: DEFAULT_GUEST_USERNAME,
        comment: "",
        stars: DEFAULT_RATING,
      });
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
  };

  const handleModalSubmit = async (values: ReviewModalFormValues) => {
    if (isSubmitting) {
      return;
    }

    await onSubmit(values);
  };

  return (
    <div
      id="write-review-modal"
      className={`review-modal js-review-modal${
        isOpen ? " review-modal--open" : ""
      }`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
    >
      <div
        className="review-modal__backdrop js-review-modal-close"
        onClick={handleClose}
      ></div>
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
            onClick={handleClose}
            disabled={isSubmitting}
          />
        </div>

        <form
          className="review-modal__form js-review-modal-form"
          onSubmit={handleSubmit(handleModalSubmit)}
        >
          <label className="review-modal__field">
            <span>Username</span>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="js-review-username"
                  name={field.name}
                  autoComplete="name"
                  value={field.value}
                  readOnly
                  disabled
                />
              )}
            />
          </label>

          <label className="review-modal__field">
            <span>Comment</span>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  className="js-review-comment"
                  name={field.name}
                  rows={4}
                  placeholder="Share your thoughts about this product"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                ></textarea>
              )}
            />
          </label>

          <div className="review-modal__field review-modal__field--rating">
            <span>Star Rating</span>
            <div
              className="review-modal__rating-picker js-review-rating-picker"
              aria-label="Select a rating from 1 to 5 stars"
            >
              <Controller
                name="stars"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="review-modal__rating-stars js-review-rating-stars">
                      <Star
                        rating={field.value}
                        className="review-modal__star"
                      />
                    </div>
                    <div
                      className="review-modal__rating-hitzones js-review-rating-hitzones"
                      aria-hidden="false"
                    >
                      {Array.from({ length: 10 }, (_, index) => {
                        const nextRating = (index + 1) / 2;

                        return (
                          <button
                            key={nextRating}
                            type="button"
                            className="review-modal__rating-hit"
                            aria-label={`Set rating to ${nextRating.toFixed(1)} stars`}
                            onClick={() => field.onChange(nextRating)}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              />
            </div>
            <Controller
              name="stars"
              control={control}
              render={({ field }) => (
                <p className="review-modal__rating-value js-review-rating-value">
                  {Number(field.value).toFixed(1)}/5
                </p>
              )}
            />
          </div>

          <div className="review-modal__actions">
            <button
              type="button"
              className="review-modal__button review-modal__button--cancel js-review-modal-close"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`review-modal__button js-review-modal-submit${
                isSubmitting ? " is-loading" : ""
              }`}
              disabled={isSubmitting}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
