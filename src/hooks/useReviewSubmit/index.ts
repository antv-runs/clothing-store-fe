import { logger } from "@/utils/logger";
import { useCallback, useEffect, useRef, useState } from "react";
import { submitReview } from "@/api/Review";
import { mapApiErrorToMessage } from "@/utils/apiErrorList";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";
import { ERROR_MESSAGES } from "@/const/errorMessages";
import { UI_TEXT } from "@/const/uiText";

import type { CreateReviewPayload } from "@/types/api/review";

interface UseReviewSubmitOptions {
  productId: string | number | null | undefined;
  onSuccess?: () => void | Promise<void>;
}

interface UseReviewSubmitResult {
  isSubmittingReview: boolean;
  reviewStatusMessage: string;
  clearReviewStatusMessage: () => void;
  handleReviewSubmit: (values: CreateReviewPayload) => Promise<void>;
}

export const useReviewSubmit = ({
  productId,
  onSuccess,
}: UseReviewSubmitOptions): UseReviewSubmitResult => {
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatusMessage, setReviewStatusMessage] = useState("");
  const reviewSubmitRequestIdRef = useRef(0);
  const isReviewSubmitInFlightRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // StrictMode runs effect cleanup+setup on mount in development.
    // Reset mount flag on each setup so guarded state updates are not blocked.
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const clearReviewStatusMessage = useCallback(() => {
    setReviewStatusMessage("");
  }, []);

  const handleReviewSubmit = useCallback(
    async ({ username, comment, stars }: CreateReviewPayload) => {
      if (
        !productId ||
        isSubmittingReview ||
        isReviewSubmitInFlightRef.current
      ) {
        return;
      }

      const normalizedUsername =
        String(username || DEFAULT_GUEST_USERNAME).trim() ||
        DEFAULT_GUEST_USERNAME;
      const normalizedComment = String(comment || "").trim();
      const normalizedStars = Math.max(1, Math.min(5, Number(stars) || 5));

      if (!normalizedComment) {
        setReviewStatusMessage(ERROR_MESSAGES.REVIEW_EMPTY);
        return;
      }

      isReviewSubmitInFlightRef.current = true;
      const requestId = ++reviewSubmitRequestIdRef.current;
      setIsSubmittingReview(true);
      setReviewStatusMessage(UI_TEXT.REVIEW_SUBMITTING);

      try {
        await submitReview(productId, {
          username: normalizedUsername,
          comment: normalizedComment,
          stars: normalizedStars,
        });

        if (
          !isMountedRef.current ||
          requestId !== reviewSubmitRequestIdRef.current
        ) {
          return;
        }

        setReviewStatusMessage(UI_TEXT.REVIEW_SUBMITTED);
        await onSuccess?.();
      } catch (error) {
        if (
          !isMountedRef.current ||
          requestId !== reviewSubmitRequestIdRef.current
        ) {
          return;
        }

        logger.error("Failed to submit review.", error);
        setReviewStatusMessage(
          mapApiErrorToMessage(
            error,
            ERROR_MESSAGES.REVIEW_SUBMIT_FAILED,
          ),
        );
      } finally {
        isReviewSubmitInFlightRef.current = false;
        if (isMountedRef.current) {
          setIsSubmittingReview(false);
        }
      }
    },
    [isSubmittingReview, onSuccess, productId],
  );

  return {
    isSubmittingReview,
    reviewStatusMessage,
    clearReviewStatusMessage,
    handleReviewSubmit,
  };
};
