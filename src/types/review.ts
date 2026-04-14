import type { PaginationMeta, PaginationLinks } from "@/types/pagination";

/**
 * Frontend/Domain review types
 * Normalized UI models after mapping from API responses
 */

export type ReviewSort = "latest" | "oldest" | "highest";

/**
 * UI model consumed by components after normalization/mapping
 */
export interface Review {
  id: string;
  productId: string;
  name: string;
  email?: string;
  ratingStar: number;
  desc: string;
  createdAt: string;
  isVerified: boolean;
}

/**
 * Paginated list result from /api/products/{id}/reviews endpoint
 * Contains normalized Review objects (UI models) with pagination metadata
 */
export interface ProductReviewsResult {
  data: Review[];
  meta: PaginationMeta;
  links?: PaginationLinks;
}
