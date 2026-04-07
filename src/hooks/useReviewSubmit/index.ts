import { useCallback, useEffect, useRef, useState } from "react";
import { submitReview } from "@/api/Review";
import { mapApiErrorToMessage } from "@/utils/apiErrorList";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";

type ReviewSubmission = {
  username: string;
  comment: string;
  stars: number;
};

interface UseReviewSubmitOptions {
  productId: string | number | null | undefined;
  onSuccess?: () => void | Promise<void>;
}

interface UseReviewSubmitResult {
  isSubmittingReview: boolean;
  reviewStatusMessage: string;
  clearReviewStatusMessage: () => void;
  handleReviewSubmit: (values: ReviewSubmission) => Promise<void>;
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
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const clearReviewStatusMessage = useCallback(() => {
    setReviewStatusMessage("");
  }, []);

  const handleReviewSubmit = useCallback(
    async ({ username, comment, stars }: ReviewSubmission) => {
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
        setReviewStatusMessage("Please write a comment before submitting.");
        return;
      }

      isReviewSubmitInFlightRef.current = true;
      const requestId = ++reviewSubmitRequestIdRef.current;
      setIsSubmittingReview(true);
      setReviewStatusMessage("Submitting review...");

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

        setReviewStatusMessage("Review submitted successfully.");
        await onSuccess?.();
      } catch (error) {
        if (
          !isMountedRef.current ||
          requestId !== reviewSubmitRequestIdRef.current
        ) {
          return;
        }

        console.error("Failed to submit review.", error);
        setReviewStatusMessage(
          mapApiErrorToMessage(
            error,
            "Failed to submit review. Please try again.",
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
