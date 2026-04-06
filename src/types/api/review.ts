/**
 * Review API types
 * Raw API request/response types for review endpoints
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

/**
 * Payload used when posting a review
 */
export interface CreateReviewPayload {
  username: string;
  comment: string;
  stars: number;
}

export interface SubmitReviewPayload extends Partial<CreateReviewPayload> {
  rating?: number;
  comment?: string;
  username?: string;
}

/**
 * Request parameters and options for review endpoints
 */
export interface GetReviewsOptions {
  page?: number;
  perPage?: number;
  rating?: number | null;
  sort?: "latest" | "oldest" | "highest";
}
