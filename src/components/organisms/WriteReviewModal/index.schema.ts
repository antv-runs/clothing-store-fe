import { z } from "zod";
import { VALIDATION_LIMITS } from "@/const/validationLimits";
import { VALIDATION_MESSAGES } from "@/const/messages";

/**
 * Zod schema for the write-review modal form.
 */
export const reviewModalSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_USERNAME)
    .max(VALIDATION_LIMITS.REVIEW_USERNAME_MAX, VALIDATION_MESSAGES.LONG_USERNAME),

  comment: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_COMMENT)
    .max(VALIDATION_LIMITS.REVIEW_COMMENT_MAX, VALIDATION_MESSAGES.LONG_COMMENT),

  stars: z
    .number()
    .min(VALIDATION_LIMITS.REVIEW_STARS_MIN)
    .max(VALIDATION_LIMITS.REVIEW_STARS_MAX),
});

/**
 * Inferred type for review form values.
 */
export type ReviewModalFormValues = z.infer<typeof reviewModalSchema>;

/**
 * Default star rating for new reviews.
 */
export const DEFAULT_RATING = VALIDATION_LIMITS.REVIEW_STARS_DEFAULT;
