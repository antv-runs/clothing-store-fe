import type { HTMLAttributes } from "react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import "./index.scss";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Star } from "@/components/atoms/Star";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";
import { REVIEW_FORM_LIMITS } from "@/const/form";
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

type WriteReviewModalProps = Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> & {
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: ReviewSubmission) => void | Promise<void>;
};

/**
 * WriteReviewModal - Static review modal markup.
 * Preserves existing classes and DOM structure.
 */
export const WriteReviewModal = ({
  isOpen,
  isSubmitting = false,
  onClose,
  onSubmit,
  className,
  ...rest
}: WriteReviewModalProps) => {
  const { control, register, handleSubmit, reset, formState } = useForm<ReviewModalFormValues>({
    resolver: zodResolver(reviewModalSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      comment: "",
      stars: DEFAULT_RATING,
    },
  });

  const commentValue = useWatch({
    control,
    name: "comment",
  });
  const commentLength = commentValue?.length ?? 0;

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
      className={clsx("review-modal", isOpen && "review-modal--open", className)}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      {...rest}
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
              <div className="review-modal__comment-wrapper">
                <textarea
                  {...register("comment")}
                  rows={4}
                  placeholder="Share your thoughts about this product"
                  maxLength={REVIEW_FORM_LIMITS.COMMENT_MAX}
                  required
                  aria-invalid={!!formState.errors.comment}
                  aria-describedby={formState.errors.comment ? "comment-error" : "comment-counter"}
                ></textarea>
                <div className="review-modal__comment-footer">
                  <span id="comment-counter" className="review-modal__comment-counter">
                    {commentLength} / {REVIEW_FORM_LIMITS.COMMENT_MAX}
                  </span>
                </div>
              </div>
              {formState.errors.comment && (
                <p id="comment-error" className="review-modal__error-message">
                  {formState.errors.comment.message}
                </p>
              )}
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
