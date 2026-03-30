// Review selector utilities (moved from services/reviewSelector.ts)
// Pure selector/filter/normalize logic, not API

import type { ApiReview, Review } from "@/types/review";
import { isSameProductId } from "@/utils/formatters";

type ReviewLike = {
  id?: string | number;
  productId?: string | number;
  product_id?: string | number;
  name?: string;
  userName?: string;
  author?: string;
  email?: string;
  desc?: string;
  content?: string;
  comment?: string;
  ratingStar?: number;
  rating?: number;
  stars?: number;
  createdAt?: string;
  created_at?: string;
  date?: string;
  isVerified?: boolean;
  verified?: boolean;
  user?: ApiReview["user"];
};

function normalizeDate(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }
  return new Date().toISOString().slice(0, 10);
}

function normalizeRating(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }
  return Math.max(0, Math.min(5, parsed));
}

function normalizeBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return Boolean(value);
}

export function normalizeReview(raw: ReviewLike): Review {
  const rawId = raw.id;
  const productRawId = raw.productId ?? raw.product_id;
  const rawName = raw.name ?? raw.userName ?? raw.author ?? raw.user?.name;
  const rawDesc = raw.desc ?? raw.content ?? raw.comment;
  const rawRating = raw.ratingStar ?? raw.rating ?? raw.stars;
  const rawCreatedAt = raw.createdAt ?? raw.created_at ?? raw.date;
  const rawVerified = raw.isVerified ?? raw.verified;

  return {
    id: String(rawId ?? ""),
    productId: String(productRawId ?? ""),
    name: String(rawName ?? "Anonymous"),
    email: raw.email,
    ratingStar: normalizeRating(rawRating),
    desc: String(rawDesc ?? ""),
    createdAt: normalizeDate(rawCreatedAt),
    isVerified: normalizeBoolean(rawVerified),
  };
}

export function selectReviewsForProduct(
  source: ReviewLike[],
  productId: string,
): Review[] {
  return source
    .map(normalizeReview)
    .filter((review) => isSameProductId(String(review.productId), productId))
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
