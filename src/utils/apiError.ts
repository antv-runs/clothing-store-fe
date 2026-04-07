import axios from "axios";
import type { NormalizedApiError } from "@/types/api/apiError";

export class ApiError extends Error implements NormalizedApiError {
  public readonly isApiError = true;
  public status?: number;
  public code?: string;
  public uiMessage: string;
  public validationErrors?: Record<string, string[]>;

  constructor({
    message,
    uiMessage,
    status,
    code,
    validationErrors,
  }: {
    message: string;
    uiMessage: string;
    status?: number;
    code?: string;
    validationErrors?: Record<string, string[]>;
  }) {
    super(message);
    this.name = "ApiError";
    this.uiMessage = uiMessage;
    this.status = status;
    this.code = code;
    this.validationErrors = validationErrors;

    // Set prototype explicitly for built-in error extension in TS
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data as unknown as Record<string, unknown>;
    const code = error.code;
    const message = error.message;

    let uiMessage = "An unexpected error occurred.";
    let validationErrors: Record<string, string[]> | undefined;

    if (!error.response) {
      uiMessage = "Network error. Please check your connection.";
    } else if (status === 400) {
      uiMessage = "Invalid request. Please check your input.";
    } else if (status === 401) {
      uiMessage = "You are not authorized. Please log in again.";
    } else if (status === 403) {
      uiMessage = "You do not have permission to perform this action.";
    } else if (status === 404) {
      uiMessage = "Requested resource not found.";
    } else if (status === 422) {
      uiMessage = "Please check your input.";
      
      // Flexibly extract validation errors
      if (responseData && typeof responseData === "object") {
        if (responseData.errors) {
          validationErrors = responseData.errors as Record<string, string[]>;
        } else if (responseData.field_errors) {
          validationErrors = responseData.field_errors as Record<string, string[]>;
        }
      }
    } else if (status && status >= 500) {
      uiMessage = "Server error. Please try again later.";
    }

    const normalizedCode =
      !error.response
        ? code || "NETWORK_ERROR"
        : status === 400 || status === 422
          ? "INVALID_PARAMS"
          : status && status >= 500
            ? "SERVER_ERROR"
            : code || (status ? `HTTP_${status}` : "UNKNOWN_ERROR");

    return new ApiError({
      message,
      uiMessage,
      status,
      code: normalizedCode,
      validationErrors,
    });
  }

  const defaultMessage = error instanceof Error ? error.message : String(error);
  return new ApiError({
    message: defaultMessage,
    uiMessage: "An unexpected error occurred.",
  });
}
