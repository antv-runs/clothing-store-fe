import type { ListErrorKind } from "@/types/listState";
import { ApiError } from "@/utils/apiError";

export type ValidationErrorMap = Record<string, string[]>;

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

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

export const mapApiErrorToListErrorKind = (error: unknown): ListErrorKind => {
  if (isApiError(error)) {
    if (error.code === "MALFORMED_RESPONSE") {
      return "malformed_data";
    }

    if (!error.status || error.code === "NETWORK_ERROR") {
      return "network";
    }

    if (error.status >= 500) {
      return "server";
    }

    if (error.status === 400 || error.status === 422) {
      return "invalid_params";
    }

    return "unknown";
  }

  if (error instanceof SyntaxError) {
    return "malformed_data";
  }

  if (
    error instanceof TypeError &&
    MALFORMED_DATA_PATTERN.test(error.message)
  ) {
    return "malformed_data";
  }

  if (error instanceof Error && MALFORMED_DATA_PATTERN.test(error.message)) {
    return "malformed_data";
  }

  if (!navigator.onLine) {
    return "network";
  }

  return "unknown";
};

export const isRetryableListErrorKind = (
  errorKind: ListErrorKind | null | undefined,
): boolean => {
  if (!errorKind) {
    return false;
  }

  return !["invalid_params", "invalid_state", "malformed_data"].includes(
    errorKind,
  );
};
