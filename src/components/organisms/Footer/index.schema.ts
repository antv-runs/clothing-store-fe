import { z } from "zod";
import { NEWSLETTER_ERROR_MESSAGES } from "@/const/form";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, NEWSLETTER_ERROR_MESSAGES.REQUIRED_EMAIL)
    .email(NEWSLETTER_ERROR_MESSAGES.INVALID_EMAIL),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
