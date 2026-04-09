import { get, post } from "@/lib/axios";
import type { ApiResponse, PaginatedApiResponse } from "@/types/pagination";
import type { ProductReviewsResult, Review } from "@/types/review";
import type {
  ApiReview,
  GetReviewsOptions,
  SubmitReviewPayload,
} from "@/types/api/review";
import {
  mapApiReviewToReview,
  mapApiReviewsToReviews,
} from "@/utils/reviewMapper";
import {
  unwrapApiResponse,
  unwrapPaginatedResponse,
  buildQueryString,
} from "@/utils/apiHelpers";

export async function getReviewsByProductId(
  productId: string | number,
  {
    page = 1,
    perPage = 10,
    rating = null,
    sort = "latest",
  }: GetReviewsOptions = {},
): Promise<ProductReviewsResult> {
  const normalizedProductId = String(productId || "").trim();
  const params = {
    page,
    per_page: perPage,
    sort,
    ...(rating !== null && { rating }),
  };
  const queryStr = buildQueryString(params).toString();
  const url = `/api/products/${encodeURIComponent(normalizedProductId)}/reviews${queryStr ? `?${queryStr}` : ""}`;
  const res = await get<PaginatedApiResponse<ApiReview>>(url);
  const {
    data: apiReviews,
    meta,
    links,
  } = unwrapPaginatedResponse(res, "Failed to fetch reviews");
  return {
    data: mapApiReviewsToReviews(apiReviews, normalizedProductId),
    meta,
    links,
  };

  // submitReview API is returned empty data to avoid breaking the UI
  // return {
  //   data: [],
  // };
}

export async function submitReview(
  productId: string | number,
  payload: SubmitReviewPayload,
): Promise<Review> {
  const normalizedProductId = String(productId || "").trim();
  const stars = Number(payload?.stars ?? payload?.rating ?? 0);
  const normalizedRating =
    Math.round(
      Math.max(1, Math.min(5, Number.isFinite(stars) ? stars : 1)) * 2,
    ) / 2;
  const normalizedComment = String(payload?.comment || "").trim();
  const body = {
    rating: normalizedRating,
    comment: normalizedComment,
  };
  const url = `/api/products/${encodeURIComponent(normalizedProductId)}/reviews`;

  // Simulate a server error for testing error handling
  // const url = `https://httpbin.org/status/500`;

  const res = await post<ApiResponse<ApiReview>>(url, body);
  const apiReview = unwrapApiResponse(res, "Failed to submit review");
  return mapApiReviewToReview(apiReview, normalizedProductId);
}
