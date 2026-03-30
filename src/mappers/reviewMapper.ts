import type { ApiReview, Review } from "@custom-types/review";

/**
 * Convert a single ApiReview to Review (UI model)
 * Maps snake_case fields (is_verified, created_at) to camelCase
 */
export function mapApiReviewToReview(
  apiReview: ApiReview,
  productId?: string,
): Review {
  return {
    id: String(apiReview.id),
    productId: productId || "",
    name: apiReview.user?.name || "Anonymous",
    ratingStar: apiReview.rating,
    desc: apiReview.comment,
    createdAt: apiReview.created_at,
    isVerified: apiReview.isVerified,
  };
}

/**
 * Convert an array of ApiReview to Review[]
 */
export function mapApiReviewsToReviews(
  apiReviews: ApiReview[],
  productId?: string,
): Review[] {
  return apiReviews.map((review) => mapApiReviewToReview(review, productId));
}
