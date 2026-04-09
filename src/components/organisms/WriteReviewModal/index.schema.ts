import { z } from "zod";

/**
 * Review form validation schema
 */
export const reviewModalSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  comment: z.string().trim().min(1, "Comment is required."),
  stars: z.number().min(0.5).max(5),
});

/**
 * Inferred type for review form values
 */
export type ReviewModalFormValues = z.infer<typeof reviewModalSchema>;

/**
 * Default rating value for new reviews
 */
export const DEFAULT_RATING = 5;
