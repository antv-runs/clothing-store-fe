import { logger } from "@/utils/logger";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { getReviewsByProductId } from "@/api/Review";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
  mapApiErrorToMessage,
} from "@/utils/apiErrorList";
import type { Review } from "@/types/review";
import {
  LIST_ERROR_KIND,
  type ListCoreState,
  type ListErrorKind,
} from "@/types/listState";

const REVIEW_ACTION = {
  RESET: "RESET",
  REQUEST_START: "REQUEST_START",
  REQUEST_RETRY_START: "REQUEST_RETRY_START",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR",
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
} as const;

const REVIEW_SORT = {
  LATEST: "latest",
  OLDEST: "oldest",
  HIGHEST: "highest",
} as const;

type ReviewSort = (typeof REVIEW_SORT)[keyof typeof REVIEW_SORT];

type State = {
  reviews: Review[];
  total: number;
  page: number;
  lastPage: number;
  filter: string;
  sort: ReviewSort;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRetrying: boolean;
  error: string | null;
  errorKind: ListErrorKind | null;
  loadMoreError: string | null;
};

type Action =
  | { type: typeof REVIEW_ACTION.RESET }
  | { type: typeof REVIEW_ACTION.REQUEST_START; append: boolean }
  | {
      type: typeof REVIEW_ACTION.REQUEST_SUCCESS;
      append: boolean;
      reviews: Review[];
      total: number;
      lastPage: number;
      page: number;
    }
  | {
      type: typeof REVIEW_ACTION.REQUEST_ERROR;
      message: string;
      errorKind: ListErrorKind;
    }
  | { type: typeof REVIEW_ACTION.REQUEST_RETRY_START }
  | { type: typeof REVIEW_ACTION.SET_FILTER; value: string }
  | { type: typeof REVIEW_ACTION.SET_SORT; value: ReviewSort };

const REVIEWS_PER_PAGE = 6;
const DEFAULT_FILTER = "All";
const DEFAULT_SORT: ReviewSort = REVIEW_SORT.LATEST;
const DEFAULT_ERROR_MESSAGE = "Unable to load reviews. Please try again.";

const initialState: State = {
  reviews: [],
  total: 0,
  page: 1,
  lastPage: 1,
  filter: DEFAULT_FILTER,
  sort: DEFAULT_SORT,
  isLoading: false,
  isLoadingMore: false,
  isRetrying: false,
  error: null,
  errorKind: null,
  loadMoreError: null,
};

const queryRating = (rating: string) => {
  return rating === DEFAULT_FILTER ? null : Number(rating);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case REVIEW_ACTION.RESET:
      return initialState;

    case REVIEW_ACTION.REQUEST_START:
      return {
        ...state,
        isLoading: !action.append,
        isLoadingMore: action.append,
        isRetrying: false,
        errorKind: null,
        loadMoreError: null,
        error: null,
      };

    case REVIEW_ACTION.REQUEST_RETRY_START:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        isRetrying: true,
        errorKind: state.errorKind,
        loadMoreError: null,
      };

    case REVIEW_ACTION.REQUEST_SUCCESS:
      return {
        ...state,
        reviews: action.append
          ? [...state.reviews, ...action.reviews]
          : action.reviews,
        total: action.total,
        lastPage: action.lastPage,
        page: action.page,
        isLoading: false,
        isLoadingMore: false,
        isRetrying: false,
        errorKind: null,
        loadMoreError: null,
        error: null,
      };

    case REVIEW_ACTION.REQUEST_ERROR:
      if (state.isLoadingMore) {
        return {
          ...state,
          isLoading: false,
          isLoadingMore: false,
          isRetrying: false,
          errorKind: state.errorKind,
          loadMoreError: action.message,
        };
      }

      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        isRetrying: false,
        errorKind: action.errorKind,
        loadMoreError: null,
        error: action.message,
      };

    case REVIEW_ACTION.SET_FILTER:
      if (state.filter === action.value) {
        return state;
      }

      return {
        ...state,
        filter: action.value,
        page: 1,
      };

    case REVIEW_ACTION.SET_SORT:
      if (state.sort === action.value) {
        return state;
      }

      return {
        ...state,
        sort: action.value,
        page: 1,
      };

    default:
      return state;
  }
};

export const useProductReviews = (
  productId: string | number | null | undefined,
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestIdRef = useRef(0);
  const previousProductIdRef = useRef(productId);
  const lastPageOneRequestKeyRef = useRef<string | null>(null);

  const requestPageOne = useCallback(
    async (
      targetProductId: string | number,
      targetFilter: string,
      targetSort: ReviewSort,
      force = false,
      isRetry = false,
    ) => {
      if (!targetProductId) {
        return;
      }

      const pageOneRequestKey = `${String(targetProductId)}|${targetFilter}|${targetSort}`;
      if (!force && lastPageOneRequestKeyRef.current === pageOneRequestKey) {
        return;
      }

      lastPageOneRequestKeyRef.current = pageOneRequestKey;
      if (isRetry) {
        dispatch({ type: REVIEW_ACTION.REQUEST_RETRY_START });
      } else {
        dispatch({ type: REVIEW_ACTION.REQUEST_START, append: false });
      }
      const currentRequestId = ++requestIdRef.current;

      try {
        const result = await getReviewsByProductId(targetProductId, {
          page: 1,
          perPage: REVIEWS_PER_PAGE,
          rating: queryRating(targetFilter),
          sort: targetSort,
        });

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        dispatch({
          type: REVIEW_ACTION.REQUEST_SUCCESS,
          append: false,
          reviews: result.data,
          total: result.meta.total,
          lastPage: result.meta.last_page,
          page: 1,
        });
      } catch (error) {
        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        logger.error("Failed to load reviews", error);
        dispatch({
          type: REVIEW_ACTION.REQUEST_ERROR,
          message: mapApiErrorToMessage(error, DEFAULT_ERROR_MESSAGE),
          errorKind: mapApiErrorToListErrorKind(error),
        });
      }
    },
    [],
  );

  useEffect(() => {
    if (!productId) {
      requestIdRef.current += 1;
      previousProductIdRef.current = productId;
      lastPageOneRequestKeyRef.current = null;
      dispatch({ type: REVIEW_ACTION.RESET });
      return;
    }

    const productChanged = previousProductIdRef.current !== productId;
    const effectiveFilter = productChanged ? DEFAULT_FILTER : state.filter;
    const effectiveSort = productChanged ? DEFAULT_SORT : state.sort;

    if (productChanged) {
      requestIdRef.current += 1;
      previousProductIdRef.current = productId;
      dispatch({ type: REVIEW_ACTION.RESET });
    }

    // One effect drives initial fetch and filter/sort reloads.
    void requestPageOne(productId, effectiveFilter, effectiveSort);
  }, [productId, requestPageOne, state.filter, state.sort]);

  const setFilter = useCallback((value: string) => {
    dispatch({ type: REVIEW_ACTION.SET_FILTER, value });
  }, []);

  const setSort = useCallback((value: ReviewSort) => {
    dispatch({ type: REVIEW_ACTION.SET_SORT, value });
  }, []);

  const loadMore = useCallback(async () => {
    if (
      !productId ||
      state.isLoading ||
      state.isLoadingMore ||
      state.isRetrying ||
      state.page >= state.lastPage
    ) {
      return;
    }

    const nextPage = state.page + 1;

    dispatch({ type: REVIEW_ACTION.REQUEST_START, append: true });
    const currentRequestId = ++requestIdRef.current;

    try {
      const result = await getReviewsByProductId(productId, {
        page: nextPage,
        perPage: REVIEWS_PER_PAGE,
        rating: queryRating(state.filter),
        sort: state.sort,
      });

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      dispatch({
        type: REVIEW_ACTION.REQUEST_SUCCESS,
        append: true,
        reviews: result.data,
        total: result.meta.total,
        lastPage: result.meta.last_page,
        page: nextPage,
      });
    } catch (error) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      logger.error("Failed to load reviews", error);
      dispatch({
        type: REVIEW_ACTION.REQUEST_ERROR,
        message: mapApiErrorToMessage(error, DEFAULT_ERROR_MESSAGE),
        errorKind: mapApiErrorToListErrorKind(error),
      });
    }
  }, [
    productId,
    state.filter,
    state.isLoading,
    state.isLoadingMore,
    state.isRetrying,
    state.lastPage,
    state.page,
    state.sort,
  ]);

  const reloadReviews = useCallback(async () => {
    if (!productId) {
      return;
    }

    await requestPageOne(productId, state.filter, state.sort, true, true);
  }, [productId, requestPageOne, state.filter, state.sort]);

  const invalidParams = !productId
    ? "A valid product id is required to load reviews."
    : null;
  const resolvedErrorKind: ListErrorKind | null = invalidParams
    ? LIST_ERROR_KIND.INVALID_PARAMS
    : state.errorKind;
  const isRetryable = isRetryableListErrorKind(resolvedErrorKind);
  const isEmpty =
    !invalidParams && !state.isLoading && !state.error && state.reviews.length === 0;
  const listState: ListCoreState<Review> = {
    data: state.reviews,
    isLoading: state.isLoading,
    isRetrying: state.isRetrying,
    isRetryable,
    isEmpty,
    error: state.error,
    errorKind: resolvedErrorKind,
    retry: () => {
      if (!isRetryable) {
        return;
      }

      void reloadReviews();
    },
    invalidParams,
  };

  return {
    data: state.reviews,
    reviews: state.reviews,
    reviewCount: state.total || state.reviews.length,
    selectedRating: state.filter,
    selectedSort: state.sort,
    hasMore: state.page < state.lastPage,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    isRetrying: state.isRetrying,
    isEmpty,
    error: state.error,
    errorKind: resolvedErrorKind,
    loadMoreError: state.loadMoreError,
    isRetryable,
    retry: () => {
      if (!isRetryable) {
        return;
      }

      void reloadReviews();
    },
    invalidParams,
    listState,
    setFilter,
    setSort,
    loadMore,
    reloadReviews,
  };
};
