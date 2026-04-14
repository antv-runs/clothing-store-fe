export const VALIDATION_MESSAGES = {
  // Checkout — Full Name
  REQUIRED_FULL_NAME: "Full name is required.",
  SHORT_FULL_NAME: "Full name is too short.",
  LONG_FULL_NAME: "Full name is too long.",
  NO_NUMBERS_FULL_NAME: "Full name cannot contain numbers.",

  // Checkout — Email
  REQUIRED_EMAIL: "Email is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  LONG_EMAIL: "Email address is too long.",

  // Checkout — Phone
  REQUIRED_PHONE: "Phone is required.",
  NUMBERS_ONLY_PHONE: "Phone number must contain only numbers.",
  SHORT_PHONE: "Phone number must be at least 9 digits.",
  LONG_PHONE: "Phone number is too long.",

  // Checkout — Address
  REQUIRED_ADDRESS: "Address is required.",
  SHORT_ADDRESS: "Address is too short.",
  LONG_ADDRESS: "Address is too long.",
  INVALID_CHARS_ADDRESS: "Address must contain valid characters.",

  // Review — Username
  REQUIRED_USERNAME: "Username is required.",
  LONG_USERNAME: "Username is too long.",

  // Review — Comment
  REQUIRED_COMMENT: "Comment is required.",
  LONG_COMMENT: "Comment is too long.",
} as const;
