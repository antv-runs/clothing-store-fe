/**
 * API response envelope for single resource / detail endpoints
 * @template T - The type of the single resource data
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Pagination metadata structure in paginated list responses
 */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page?: number;
  from?: number | null;
  to?: number | null;
  path?: string;
}

/**
 * Pagination links structure in paginated list responses
 */
export interface PaginationLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
  [key: string]: string | null | undefined;
}

/**
 * API response envelope for paginated list endpoints
 * Structure: { success, message, data: T[], meta, links }
 * @template T - The type of individual items in the data array
 */
export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
  links?: PaginationLinks;
}
