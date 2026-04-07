import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";

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
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [isTopSellingLoading, setIsTopSellingLoading] = useState(true);
  const [isRetryingTopSelling, setIsRetryingTopSelling] = useState(false);
  const [topSellingError, setTopSellingError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isRetryingReviews, setIsRetryingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
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
    } catch (error) {
      if (
        !isMountedRef.current ||
        requestId !== newArrivalsRequestIdRef.current
      ) {
        return;
      }

      console.error("Failed to load new arrivals.", error);
      setNewArrivals([]);
      setNewArrivalsError(NEW_ARRIVALS_ERROR);
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
    } catch (error) {
      if (
        !isMountedRef.current ||
        requestId !== topSellingRequestIdRef.current
      ) {
        return;
      }

      console.error("Failed to load top selling products.", error);
      setTopSelling([]);
      setTopSellingError(TOP_SELLING_ERROR);
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
    } catch (error) {
      if (!isMountedRef.current || requestId !== reviewsRequestIdRef.current) {
        return;
      }

      console.error("Failed to load customer reviews.", error);
      setReviews([]);
      setReviewsError(REVIEWS_ERROR);
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
    if (isRetryingNewArrivals || !newArrivalsError) {
      return;
    }

    void loadNewArrivals(true);
  }, [isRetryingNewArrivals, loadNewArrivals, newArrivalsError]);

  const retryTopSelling = useCallback(() => {
    if (isRetryingTopSelling || !topSellingError) {
      return;
    }

    void loadTopSelling(true);
  }, [isRetryingTopSelling, loadTopSelling, topSellingError]);

  const retryReviews = useCallback(() => {
    if (isRetryingReviews || !reviewsError) {
      return;
    }

    void loadReviews(true);
  }, [isRetryingReviews, loadReviews, reviewsError]);

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
    isNewArrivalsEmpty,
    isTopSellingEmpty,
    retryNewArrivals,
    retryTopSelling,
    retryReviews,
  };
};
