/**
 * Validation limits for form fields.
 * These are the authoritative numeric bounds consumed by Zod schemas.
 * All units are character counts unless noted otherwise.
 */
export const VALIDATION_LIMITS = {
  // Checkout — Full Name
  FULL_NAME_MIN: 2,
  FULL_NAME_MAX: 100,

  // Checkout — Email
  EMAIL_MAX: 254, // RFC 5321 maximum email address length

  // Checkout — Phone
  PHONE_MIN: 9,
  PHONE_MAX: 15, // E.164 maximum (excluding + prefix)

  // Checkout — Address
  ADDRESS_MIN: 5,
  ADDRESS_MAX: 200,

  // Review — Username
  REVIEW_USERNAME_MAX: 50,

  // Review — Comment
  REVIEW_COMMENT_MAX: 254,

  // Review — Star rating
  REVIEW_STARS_MIN: 0.5,
  REVIEW_STARS_MAX: 5,
  REVIEW_STARS_DEFAULT: 5,
} as const;
