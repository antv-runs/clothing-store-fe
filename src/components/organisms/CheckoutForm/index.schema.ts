import { z } from "zod";
import { VALIDATION_LIMITS } from "@/const/validationLimits";
import { VALIDATION_MESSAGES } from "@/const/validationMessages";

/**
 * Zod schema for the checkout form.
 */
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_FULL_NAME)
    .min(VALIDATION_LIMITS.FULL_NAME_MIN, VALIDATION_MESSAGES.SHORT_FULL_NAME)
    .max(VALIDATION_LIMITS.FULL_NAME_MAX, VALIDATION_MESSAGES.LONG_FULL_NAME)
    .refine((val) => !/\d/.test(val), {
      message: VALIDATION_MESSAGES.NO_NUMBERS_FULL_NAME,
    }),

  email: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_EMAIL)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .max(VALIDATION_LIMITS.EMAIL_MAX, VALIDATION_MESSAGES.LONG_EMAIL),

  phone: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_PHONE)
    .regex(/^\d+$/, VALIDATION_MESSAGES.NUMBERS_ONLY_PHONE)
    .min(VALIDATION_LIMITS.PHONE_MIN, VALIDATION_MESSAGES.SHORT_PHONE)
    .max(VALIDATION_LIMITS.PHONE_MAX, VALIDATION_MESSAGES.LONG_PHONE),

  address: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_ADDRESS)
    .min(VALIDATION_LIMITS.ADDRESS_MIN, VALIDATION_MESSAGES.SHORT_ADDRESS)
    .max(VALIDATION_LIMITS.ADDRESS_MAX, VALIDATION_MESSAGES.LONG_ADDRESS)
    .refine((val) => /[a-zA-Z0-9]/.test(val), {
      message: VALIDATION_MESSAGES.INVALID_CHARS_ADDRESS,
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
