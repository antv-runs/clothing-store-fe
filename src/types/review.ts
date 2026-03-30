import type { PaginationMeta, PaginationLinks } from "./api";

/**
 * Raw API objects from /api/products/{id}/reviews
 * Backend returns snake_case fields
 */

export interface ApiReviewUser {
  name: string;
}

export interface ApiReview {
  id: number;
  comment: string;
  isVerified: boolean;
  created_at: string;
  rating: number;
  user: ApiReviewUser;
}

// Payload used when posting a review
export interface CreateReviewPayload {
  username: string;
  comment: string;
  stars: number;
}

export interface SubmitReviewPayload extends Partial<CreateReviewPayload> {
  rating?: number;
  stars?: number;
  comment?: string;
  username?: string;
}

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
