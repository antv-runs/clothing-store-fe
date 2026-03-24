export interface ApiReviewUser {
  name: string;
}

// Raw API object from /api/products/{id}/reviews
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

// UI model after page-level mapping in the old app
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
