import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Full name is too short.")
    .max(100, "Full name is too long.")
    .refine((val) => !/\d/.test(val), {
      message: "Full name cannot contain numbers.",
    }),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone is required.")
    .min(6, "Phone number is too short.")
    .max(20, "Phone number is too long."),

  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .min(5, "Address is too short.")
    .max(200, "Address is too long.")
    .refine((val) => /[a-zA-Z0-9]/.test(val), {
      message: "Address must contain valid characters.",
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
