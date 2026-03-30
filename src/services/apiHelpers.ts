/**
 * Shared API response handling helpers
 * Reduces duplication across service files
 */

import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationMeta,
  PaginationLinks,
} from "@custom-types/api";

/**
 * Unwrap and validate a single-resource API response
 * @throws Error if response.success === false
 * @returns The unwrapped data
 */
export function unwrapApiResponse<T>(
  response: ApiResponse<T>,
  fallbackMessage: string = "API request failed",
): T {
  if (!response.success) {
    throw new Error(response.message || fallbackMessage);
  }
  return response.data;
}

/**
 * Unwrap and validate a paginated API response
 * @throws Error if response.success === false
 * @returns Object with { data, meta, links }
 */
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

/**
 * Build a safe query string from a params object
 * Ignores undefined, null, and empty string values
 * @returns URLSearchParams instance (can chain .toString())
 */
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

/**
 * Convert query params object to a query string suitable for URLs
 * Example: { page: 1, per_page: 10 } → "?page=1&per_page=10"
 * Pass the result to a URL endpoint
 */
export function getQueryStringForUrl(params: Record<string, any> = {}): string {
  const query = buildQueryString(params);
  const queryStr = query.toString();
  return queryStr ? `?${queryStr}` : "";
}
