// API helpers (moved from services/apiHelpers.ts)
// Generic helpers for API response and query string

import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationMeta,
  PaginationLinks,
} from "@/types/pagination";
import { ApiError } from "@/utils/apiError";

export function unwrapApiResponse<T>(
  response: ApiResponse<T>,
  fallbackMessage: string = "API request failed",
): T {
  if (!response.success) {
    throw new ApiError({
      message: response.message || fallbackMessage,
      uiMessage: response.message || fallbackMessage,
      status: 400,
    });
  }
  return response.data;
}

export function unwrapPaginatedResponse<T>(
  response: PaginatedApiResponse<T>,
  fallbackMessage: string = "API request failed",
): {
  data: T[];
  meta: PaginationMeta;
  links?: PaginationLinks;
} {
  if (!response.success) {
    throw new ApiError({
      message: response.message || fallbackMessage,
      uiMessage: response.message || fallbackMessage,
      status: 400,
    });
  }
  return {
    data: response.data,
    meta: response.meta,
    links: response.links,
  };
}

export function buildQueryString(
  params: object = {},
): URLSearchParams {
  const query = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  return query;
}

