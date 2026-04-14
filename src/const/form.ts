export const NEWSLETTER_ERROR_MESSAGES = {
  REQUIRED_EMAIL: "Email is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
} as const;

export const REVIEW_FORM_LIMITS = {
  COMMENT_MAX: 254,
} as const;

export const REVIEW_FORM_ERROR_MESSAGES = {
  COMMENT_REQUIRED: "Please write a comment.",
  COMMENT_TOO_LONG: `Comment must not exceed ${REVIEW_FORM_LIMITS.COMMENT_MAX} characters.`,
} as const;
