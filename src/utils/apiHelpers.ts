// API helpers (moved from services/apiHelpers.ts)
// Generic helpers for API response and query string

import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationMeta,
  PaginationLinks,
} from "@/types/api";

export function unwrapApiResponse<T>(
  response: ApiResponse<T>,
  fallbackMessage: string = "API request failed",
): T {
  if (!response.success) {
    throw new Error(response.message || fallbackMessage);
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
    throw new Error(response.message || fallbackMessage);
  }
  return {
    data: response.data,
    meta: response.meta,
    links: response.links,
  };
}

export function buildQueryString(
  params: Record<string, any> = {},
): URLSearchParams {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  return query;
}

export function getQueryStringForUrl(params: Record<string, any> = {}): string {
  const query = buildQueryString(params);
  const queryStr = query.toString();
  return queryStr ? `?${queryStr}` : "";
}
