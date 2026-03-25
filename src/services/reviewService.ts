import { reviews as seedReviews } from "../data/reviews";
import type { CreateReviewPayload, Review } from "../types/review";
import { isSameProductId } from "../utils/formatters";

const MOCK_DELAY_MS = 120;

type ReviewSort = "latest" | "oldest" | "highest";

interface ReviewMeta {
  current_page: number;
  last_page: number;
  total: number;
}

export interface ProductReviewsResult {
  data: Review[];
  meta: ReviewMeta;
}

interface GetReviewsOptions {
  page?: number;
  perPage?: number;
  rating?: number | null;
  sort?: ReviewSort;
  signal?: AbortSignal;
}

interface SubmitReviewPayload extends Partial<CreateReviewPayload> {
  rating?: number;
}

interface ServiceOptions {
  signal?: AbortSignal;
}

const submittedReviews: Review[] = [];

function createAbortError(): Error {
  return new DOMException("The operation was aborted.", "AbortError");
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError());
  }

  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onAbort);
      reject(createAbortError());
    }

    signal?.addEventListener("abort", onAbort);
  });
}

function normalizeReview(review: Review): Review {
  return {
    ...review,
    id: String(review.id),
    productId: String(review.productId),
    ratingStar: Math.max(0, Math.min(5, Number(review.ratingStar) || 0)),
    createdAt: review.createdAt || new Date().toISOString().slice(0, 10),
  };
}

function sortReviews(items: Review[], sort: ReviewSort): Review[] {
  const next = [...items];

  if (sort === "highest") {
    next.sort((a, b) => b.ratingStar - a.ratingStar);
    return next;
  }

  next.sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return sort === "oldest" ? aTime - bTime : bTime - aTime;
  });

  return next;
}

function paginateReviews(
  items: Review[],
  page: number,
  perPage: number,
): ProductReviewsResult {
  const safePage = Math.max(1, Number(page) || 1);
  const safePerPage = Math.max(1, Number(perPage) || 10);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / safePerPage));
  const startIndex = (safePage - 1) * safePerPage;

  return {
    data: items.slice(startIndex, startIndex + safePerPage),
    meta: {
      current_page: safePage,
      last_page: lastPage,
      total,
    },
  };
}

function getReviewList(): Review[] {
  return [...submittedReviews, ...seedReviews].map(normalizeReview);
}

export async function getReviewsByProductId(
  productId: string | number,
  {
    page = 1,
    perPage = 10,
    rating = null,
    sort = "latest",
    signal,
  }: GetReviewsOptions = {},
): Promise<ProductReviewsResult> {
  const normalizedProductId = String(productId || "").trim();

  await delay(MOCK_DELAY_MS, signal);

  const normalizedRating = Number(rating);

  const filtered = getReviewList().filter((review) => {
    if (!isSameProductId(normalizedProductId, String(review.productId))) {
      return false;
    }

    if (rating === null || !Number.isFinite(normalizedRating)) {
      return true;
    }

    return Math.abs(review.ratingStar - normalizedRating) < 0.001;
  });

  return paginateReviews(sortReviews(filtered, sort), page, perPage);
}

export async function submitReview(
  productId: string | number,
  payload: SubmitReviewPayload,
  options: ServiceOptions = {},
): Promise<Review> {
  await delay(MOCK_DELAY_MS, options.signal);

  const normalizedProductId = String(productId || "").trim();
  const stars = Number(payload.stars ?? payload.rating ?? 0);
  const normalizedStars =
    Math.round(Math.max(1, Math.min(5, stars || 1)) * 2) / 2;

  const review: Review = {
    id: String(Date.now()),
    productId: normalizedProductId,
    name: String(payload.username || "Guest").trim() || "Guest",
    desc: String(payload.comment || "").trim(),
    ratingStar: normalizedStars,
    createdAt: new Date().toISOString(),
    isVerified: false,
  };

  submittedReviews.unshift(review);

  return normalizeReview(review);
}
