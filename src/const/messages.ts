/**
 * Dictionary of all application-wide human-readable strings, error messages, and UI labels.
 */

export const ERROR_MESSAGES = {
  NEW_ARRIVALS_LOAD: "Failed to load new arrivals. Please try again.",
  TOP_SELLING_LOAD: "Failed to load top selling products. Please try again.",
  REVIEWS_LOAD: "Failed to load customer reviews. Please try again.",
  PRODUCT_LOAD_NETWORK: "Failed to load product. Please check your connection and try again.",
  PRODUCT_LOAD_SYSTEM: "Something went wrong while loading this product.",
  GENERIC_ERROR: "Something went wrong",
  INVALID_ORDER_DATA: "Invalid order data. Please review your information and cart.",
  CHECKOUT_VALIDATION: "Please review the highlighted fields and try again.",
  CHECKOUT_UNEXPECTED: "An unexpected error occurred while placing your order.",
  CHECKOUT_GENERIC: "An unexpected error occurred. Please try again or contact support.",
  CHECKOUT_LOAD: "We couldn't securely load your checkout data right now.",
  CART_HYDRATION_LOAD: "We couldn't securely load your cart data right now.",
  REVIEW_EMPTY: "Please write a comment before submitting.",
  CART_ADD_ERROR: "Unable to add item to cart",
  COUPON_APPLY_FAILED: "Failed to apply coupon",
  PAGE_RESOURCE_LOAD: "A page resource failed to load. Please retry.",
  PAGE_LOAD_UNEXPECTED: "We're sorry, an unexpected error occurred while loading this page.",
  REVIEW_SUBMIT_FAILED: "Failed to submit review. Please try again.",
} as const;

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

export const UI_TEXT = {
  ORDER_PLACED_SUCCESS: "Order placed successfully. We will process it shortly.",
  ORDER_PLACED_SUCCESS_LONG: "Your order has been placed successfully. We will process it shortly.",
  REVIEW_SUBMIT_SUCCESS_TOAST: "Review submitted successfully. Thank you for your feedback!",
  REVIEW_SUBMITTING: "Submitting review...",
  REVIEW_SUBMITTED: "Review submitted successfully.",
  ITEM_ADDED_TO_CART: "Item added to cart",
  CART_MAX_QUANTITY_REACHED:
    "You\'ve reached the maximum quantity for this product",
  BACK_ONLINE: "Back online",
  NO_INTERNET_CONNECTION: "No internet connection",
  ORDER_SUMMARY: "Order Summary",
  SUBTOTAL: "Subtotal",
  DISCOUNT: "Discount",
  DELIVERY_FEE: "Delivery Fee",
  TOTAL: "Total",
  GO_TO_CHECKOUT: "Go to Checkout",
  BACK_TO_HOME: "Back to Home",
  GO_BACK_TO_HOME: "Go back to Home",
  TRY_AGAIN: "Try Again",
  PRODUCT_NOT_FOUND: "Product not found.",
  LOADING: "Loading",
} as const;
