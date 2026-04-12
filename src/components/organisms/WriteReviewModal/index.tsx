import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.scss";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Star } from "@/components/atoms/Star";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";
import {
  reviewModalSchema,
  DEFAULT_RATING,
  type ReviewModalFormValues,
} from "./index.schema";

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
      className={`review-modal${isOpen ? " review-modal--open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
    >
      <div className="review-modal__backdrop" onClick={handleClose}></div>
      <div className="review-modal__dialog" role="document">
        <div className="review-modal__header">
          <h3 id="write-review-title" className="review-modal__title">
            Write a Review
          </h3>
          <IconButton
            svgName="icn_close"
            className="review-modal__close"
            ariaLabel="Close review form"
            iconWidth={16}
            iconHeight={16}
            onClick={handleClose}
          />
        </div>

        <form
          className="review-modal__form"
          onSubmit={handleSubmit(handleModalSubmit)}
          aria-busy={isSubmitting}
        >
          <fieldset className="review-modal__form-body" disabled={isSubmitting}>
            <label className="review-modal__field">
              <span>Username</span>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
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
              <span>Comment <abbr className="required-mark" title="Required" aria-hidden="true">*</abbr></span>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <textarea
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
              <span>Star Rating <abbr className="required-mark" title="Required" aria-hidden="true">*</abbr></span>
              <div className="review-modal__rating-row">
                <Controller
                  name="stars"
                  control={control}
                  render={({ field }) => (
                    <div className="review-modal__rating-picker">
                      <div
                        className="review-modal__rating-stars"
                        aria-label="Select a rating from 1 to 5 stars"
                      >
                        {Array.from({ length: 5 }, (_, index) => {
                          const starIndex = index + 1;
                          const starValue = Math.max(
                            0,
                            Math.min(1, field.value - index),
                          );

                          return (
                            <button
                              key={starIndex}
                              type="button"
                              className="review-modal__rating-hit"
                              aria-label={`Set rating to ${starIndex} stars`}
                              aria-pressed={field.value >= starIndex}
                              onClick={(event) => {
                                const button = event.currentTarget;
                                const rect = button.getBoundingClientRect();
                                const isLeftHalf =
                                  event.clientX - rect.left < rect.width / 2;
                                field.onChange(
                                  isLeftHalf ? starIndex - 0.5 : starIndex,
                                );
                              }}
                            >
                              <Star
                                rating={starValue}
                                maxStars={1}
                                className="review-modal__star"
                                halfStarMode="clip"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                />
                <Controller
                  name="stars"
                  control={control}
                  render={({ field }) => (
                    <p className="review-modal__rating-value">
                      {Number(field.value).toFixed(1)}/5
                    </p>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <div className="review-modal__actions">
            <Button
              variant="secondary"
              type="button"
              className="review-modal__button review-modal__button--cancel"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="review-modal__button"
              isLoading={isSubmitting}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
