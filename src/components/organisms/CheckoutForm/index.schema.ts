import { z } from "zod";

import { VALIDATION_MESSAGES } from "@/const/validationMessages";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_FULL_NAME)
    .min(2, VALIDATION_MESSAGES.SHORT_FULL_NAME)
    .max(100, VALIDATION_MESSAGES.LONG_FULL_NAME)
    .refine((val) => !/\d/.test(val), {
      message: VALIDATION_MESSAGES.NO_NUMBERS_FULL_NAME,
    }),

  email: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_EMAIL)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),

  phone: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_PHONE)
    .regex(/^\d+$/, VALIDATION_MESSAGES.NUMBERS_ONLY_PHONE)
    .min(9, VALIDATION_MESSAGES.SHORT_PHONE)
    .max(15, VALIDATION_MESSAGES.LONG_PHONE),

  address: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED_ADDRESS)
    .min(5, VALIDATION_MESSAGES.SHORT_ADDRESS)
    .max(200, VALIDATION_MESSAGES.LONG_ADDRESS)
    .refine((val) => /[a-zA-Z0-9]/.test(val), {
      message: VALIDATION_MESSAGES.INVALID_CHARS_ADDRESS,
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
