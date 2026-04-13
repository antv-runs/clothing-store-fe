import { logger } from "@/utils/logger";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
} from "@/utils/apiErrorList";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";
import type { ListErrorKind } from "@/types/listState";

type UseHomeDataResult = {
  newArrivals: Product[];
  topSelling: Product[];
  reviews: Review[];
  isNewArrivalsLoading: boolean;
  isTopSellingLoading: boolean;
  isReviewsLoading: boolean;
  isRetryingNewArrivals: boolean;
  isRetryingTopSelling: boolean;
  isRetryingReviews: boolean;
  newArrivalsError: string | null;
  topSellingError: string | null;
  reviewsError: string | null;
  newArrivalsErrorKind: ListErrorKind | null;
  topSellingErrorKind: ListErrorKind | null;
  reviewsErrorKind: ListErrorKind | null;
  isNewArrivalsEmpty: boolean;
  isTopSellingEmpty: boolean;
  retryNewArrivals: () => void;
  retryTopSelling: () => void;
  retryReviews: () => void;
};

const NEW_ARRIVALS_ERROR = "Failed to load new arrivals. Please try again.";
const TOP_SELLING_ERROR =
  "Failed to load top selling products. Please try again.";
const REVIEWS_ERROR = "Failed to load customer reviews. Please try again.";

export const useHomeData = (): UseHomeDataResult => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isNewArrivalsLoading, setIsNewArrivalsLoading] = useState(true);
  const [isRetryingNewArrivals, setIsRetryingNewArrivals] = useState(false);
  const [newArrivalsError, setNewArrivalsError] = useState<string | null>(null);
  const [newArrivalsErrorKind, setNewArrivalsErrorKind] =
    useState<ListErrorKind | null>(null);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [isTopSellingLoading, setIsTopSellingLoading] = useState(true);
  const [isRetryingTopSelling, setIsRetryingTopSelling] = useState(false);
  const [topSellingError, setTopSellingError] = useState<string | null>(null);
  const [topSellingErrorKind, setTopSellingErrorKind] =
    useState<ListErrorKind | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isRetryingReviews, setIsRetryingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [reviewsErrorKind, setReviewsErrorKind] =
    useState<ListErrorKind | null>(null);
  const newArrivalsRequestIdRef = useRef(0);
  const topSellingRequestIdRef = useRef(0);
  const reviewsRequestIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadNewArrivals = useCallback(async (isRetry = false) => {
    const requestId = ++newArrivalsRequestIdRef.current;

    if (isRetry) {
      setIsRetryingNewArrivals(true);
    } else {
      setIsNewArrivalsLoading(true);
      setNewArrivalsError(null);
      setNewArrivalsErrorKind(null);
    }

    try {
      const result = await getProducts({
        page: 1,
        per_page: 4,
      });

      if (
        !isMountedRef.current ||
        requestId !== newArrivalsRequestIdRef.current
      ) {
        return;
      }

      setNewArrivals(result.data);
      setNewArrivalsError(null);
      setNewArrivalsErrorKind(null);
    } catch (error) {
      if (
        !isMountedRef.current ||
        requestId !== newArrivalsRequestIdRef.current
      ) {
        return;
      }

      logger.error("Failed to load new arrivals.", error);
      setNewArrivals([]);
      setNewArrivalsError(NEW_ARRIVALS_ERROR);
      setNewArrivalsErrorKind(mapApiErrorToListErrorKind(error));
    } finally {
      if (
        isMountedRef.current &&
        requestId === newArrivalsRequestIdRef.current
      ) {
        if (isRetry) {
          setIsRetryingNewArrivals(false);
        } else {
          setIsNewArrivalsLoading(false);
        }
      }
    }
  }, []);

  const loadTopSelling = useCallback(async (isRetry = false) => {
    const requestId = ++topSellingRequestIdRef.current;

    if (isRetry) {
      setIsRetryingTopSelling(true);
    } else {
      setIsTopSellingLoading(true);
      setTopSellingError(null);
      setTopSellingErrorKind(null);
    }

    try {
      const result = await getProducts({
        page: 2,
        per_page: 4,
      });

      if (
        !isMountedRef.current ||
        requestId !== topSellingRequestIdRef.current
      ) {
        return;
      }

      setTopSelling(result.data);
      setTopSellingError(null);
      setTopSellingErrorKind(null);
    } catch (error) {
      if (
        !isMountedRef.current ||
        requestId !== topSellingRequestIdRef.current
      ) {
        return;
      }

      logger.error("Failed to load top selling products.", error);
      setTopSelling([]);
      setTopSellingError(TOP_SELLING_ERROR);
      setTopSellingErrorKind(mapApiErrorToListErrorKind(error));
    } finally {
      if (
        isMountedRef.current &&
        requestId === topSellingRequestIdRef.current
      ) {
        if (isRetry) {
          setIsRetryingTopSelling(false);
        } else {
          setIsTopSellingLoading(false);
        }
      }
    }
  }, []);

  const loadReviews = useCallback(async (isRetry = false) => {
    const requestId = ++reviewsRequestIdRef.current;

    if (isRetry) {
      setIsRetryingReviews(true);
    } else {
      setIsReviewsLoading(true);
      setReviewsError(null);
      setReviewsErrorKind(null);
    }

    try {
      const result = await getReviewsByProductId(180, {
        page: 1,
        perPage: 10,
        sort: "latest",
      });

      if (!isMountedRef.current || requestId !== reviewsRequestIdRef.current) {
        return;
      }

      setReviews(result.data);
      setReviewsError(null);
      setReviewsErrorKind(null);
    } catch (error) {
      if (!isMountedRef.current || requestId !== reviewsRequestIdRef.current) {
        return;
      }

      logger.error("Failed to load customer reviews.", error);
      setReviews([]);
      setReviewsError(REVIEWS_ERROR);
      setReviewsErrorKind(mapApiErrorToListErrorKind(error));
    } finally {
      if (isMountedRef.current && requestId === reviewsRequestIdRef.current) {
        if (isRetry) {
          setIsRetryingReviews(false);
        } else {
          setIsReviewsLoading(false);
        }
      }
    }
  }, []);

  const retryNewArrivals = useCallback(() => {
    if (
      isRetryingNewArrivals ||
      !newArrivalsError ||
      !isRetryableListErrorKind(newArrivalsErrorKind)
    ) {
      return;
    }

    void loadNewArrivals(true);
  }, [
    isRetryingNewArrivals,
    loadNewArrivals,
    newArrivalsError,
    newArrivalsErrorKind,
  ]);

  const retryTopSelling = useCallback(() => {
    if (
      isRetryingTopSelling ||
      !topSellingError ||
      !isRetryableListErrorKind(topSellingErrorKind)
    ) {
      return;
    }

    void loadTopSelling(true);
  }, [
    isRetryingTopSelling,
    loadTopSelling,
    topSellingError,
    topSellingErrorKind,
  ]);

  const retryReviews = useCallback(() => {
    if (
      isRetryingReviews ||
      !reviewsError ||
      !isRetryableListErrorKind(reviewsErrorKind)
    ) {
      return;
    }

    void loadReviews(true);
  }, [isRetryingReviews, loadReviews, reviewsError, reviewsErrorKind]);

  const isNewArrivalsEmpty =
    !isNewArrivalsLoading && !newArrivalsError && newArrivals.length === 0;
  const isTopSellingEmpty =
    !isTopSellingLoading && !topSellingError && topSelling.length === 0;

  useEffect(() => {
    isMountedRef.current = true;

    void loadNewArrivals();
    void loadTopSelling();
    void loadReviews();
  }, [loadNewArrivals, loadTopSelling, loadReviews]);

  return {
    newArrivals,
    topSelling,
    reviews,
    isNewArrivalsLoading,
    isTopSellingLoading,
    isReviewsLoading,
    isRetryingNewArrivals,
    isRetryingTopSelling,
    isRetryingReviews,
    newArrivalsError,
    topSellingError,
    reviewsError,
    newArrivalsErrorKind,
    topSellingErrorKind,
    reviewsErrorKind,
    isNewArrivalsEmpty,
    isTopSellingEmpty,
    retryNewArrivals,
    retryTopSelling,
    retryReviews,
  };
};
