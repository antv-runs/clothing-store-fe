import { useCallback, useEffect, useReducer, useRef } from "react";
import { getReviewsByProductId } from "@/api/Review";
import type { Review } from "@/types/review";

const REVIEW_ACTION = {
  RESET: "RESET",
  REQUEST_START: "REQUEST_START",
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
  error: string | null;
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
  | { type: typeof REVIEW_ACTION.REQUEST_ERROR; message: string }
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
  error: null,
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
        error: null,
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
      };

    case REVIEW_ACTION.REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
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
    ) => {
      if (!targetProductId) {
        return;
      }

      const pageOneRequestKey = `${String(targetProductId)}|${targetFilter}|${targetSort}`;
      if (!force && lastPageOneRequestKeyRef.current === pageOneRequestKey) {
        return;
      }

      lastPageOneRequestKeyRef.current = pageOneRequestKey;
      dispatch({ type: REVIEW_ACTION.REQUEST_START, append: false });
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

        console.error("Failed to load reviews", error);
        dispatch({
          type: REVIEW_ACTION.REQUEST_ERROR,
          message: DEFAULT_ERROR_MESSAGE,
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

      console.error("Failed to load reviews", error);
      dispatch({
        type: REVIEW_ACTION.REQUEST_ERROR,
        message: DEFAULT_ERROR_MESSAGE,
      });
    }
  }, [
    productId,
    state.filter,
    state.isLoading,
    state.isLoadingMore,
    state.lastPage,
    state.page,
    state.sort,
  ]);

  const reloadReviews = useCallback(async () => {
    if (!productId) {
      return;
    }

    await requestPageOne(productId, state.filter, state.sort, true);
  }, [productId, requestPageOne, state.filter, state.sort]);

  return {
    reviews: state.reviews,
    reviewCount: state.total || state.reviews.length,
    selectedRating: state.filter,
    selectedSort: state.sort,
    hasMore: state.page < state.lastPage,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    error: state.error,
    setFilter,
    setSort,
    loadMore,
    reloadReviews,
  };
};
