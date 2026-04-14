import { ApiErrorCode } from "@/const/apiErrorCodes";
import { LIST_ERROR_KIND, type ListErrorKind } from "@/types/listState";
import { isApiError, ApiError } from "@/utils/apiError";
export { isApiError, ApiError };
import type { ValidationErrorMap } from "@/types/api/apiError";

export const mapApiErrorToMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (isApiError(error)) {
    return error.uiMessage;
  }

  return fallbackMessage;
};

export const mapApiValidationErrors = (
  error: unknown,
): ValidationErrorMap | null => {
  if (!isApiError(error)) {
    return null;
  }

  if (
    !error.validationErrors ||
    Object.keys(error.validationErrors).length === 0
  ) {
    return null;
  }

  return error.validationErrors;
};

const MALFORMED_DATA_PATTERN =
  /malformed|invalid\s+(response|payload|data)|unexpected\s+(shape|structure|format)/i;

const NON_RETRYABLE_LIST_ERROR_KINDS = new Set<ListErrorKind>([
  LIST_ERROR_KIND.INVALID_PARAMS,
  LIST_ERROR_KIND.INVALID_STATE,
  LIST_ERROR_KIND.MALFORMED_DATA,
]);

export const mapApiErrorToListErrorKind = (error: unknown): ListErrorKind => {
  if (isApiError(error)) {
    if (!error.status || error.code === ApiErrorCode.NETWORK_ERROR) {
      return LIST_ERROR_KIND.NETWORK;
    }

    if (error.status >= 500) {
      return LIST_ERROR_KIND.SERVER;
    }

    if (error.status === 400 || error.status === 422) {
      return LIST_ERROR_KIND.INVALID_PARAMS;
    }

    return LIST_ERROR_KIND.UNKNOWN;
  }

  if (error instanceof SyntaxError) {
    return LIST_ERROR_KIND.MALFORMED_DATA;
  }

  if (
    error instanceof TypeError &&
    MALFORMED_DATA_PATTERN.test(error.message)
  ) {
    return LIST_ERROR_KIND.MALFORMED_DATA;
  }

  if (error instanceof Error && MALFORMED_DATA_PATTERN.test(error.message)) {
    return LIST_ERROR_KIND.MALFORMED_DATA;
  }

  if (!navigator.onLine) {
    return LIST_ERROR_KIND.NETWORK;
  }

  return LIST_ERROR_KIND.UNKNOWN;
};

export const isRetryableListErrorKind = (
  errorKind: ListErrorKind | null | undefined,
): boolean => {
  if (!errorKind) {
    return false;
  }

  return !NON_RETRYABLE_LIST_ERROR_KINDS.has(errorKind);
};
