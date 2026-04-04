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
