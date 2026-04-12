import axios from "axios";
import type { AxiosError } from "axios";
import {
  ApiErrorCode,
  API_ERROR_MESSAGES,
  STATUS_TO_API_ERROR_CODE,
  isApiErrorCode,
  isSupportedStatusCode,
  type STATUS_CODE,
} from "@/const/apiErrorCodes";
import type { NormalizedApiError } from "@/types/api/apiError";
import type { StandardizedApiError } from "@/types/apiError";

type ValidationErrorMap = Record<string, string[]>;

type StandardizedAxiosApiError = StandardizedApiError & {
  status?: STATUS_CODE;
  validationErrors?: ValidationErrorMap;
};

type BackendErrorResponse = {
  code?: unknown;
  error_code?: unknown;
  errors?: unknown;
  field_errors?: unknown;
};

export class ApiError extends Error implements NormalizedApiError {
  public readonly isApiError = true;
  public status?: STATUS_CODE;
  public code: ApiErrorCode;
  public uiMessage: string;
  public validationErrors?: ValidationErrorMap;

  constructor({
    message,
    uiMessage,
    status,
    code,
    validationErrors,
  }: {
    message: string;
    uiMessage?: string;
    status?: STATUS_CODE;
    code?: ApiErrorCode;
    validationErrors?: ValidationErrorMap;
  }) {
    super(message);
    this.name = "ApiError";
    this.uiMessage = uiMessage ?? message;
    this.status = status;
    this.code = code ?? ApiErrorCode.INTERNAL_SERVER_ERROR;
    this.validationErrors = validationErrors;

    // Set prototype explicitly for built-in error extension in TS
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const toSupportedStatusCode = (status?: number): STATUS_CODE | undefined => {
  if (!status || !isSupportedStatusCode(status)) {
    return undefined;
  }

  return status;
};

const extractValidationErrors = (
  responseData: unknown,
): ValidationErrorMap | undefined => {
  if (!responseData || typeof responseData !== "object") {
    return undefined;
  }

  const candidate = responseData as {
    errors?: unknown;
    field_errors?: unknown;
  };

  const validationSource = candidate.errors ?? candidate.field_errors;

  if (!validationSource || typeof validationSource !== "object") {
    return undefined;
  }

  const normalizedEntries = Object.entries(validationSource).filter(
    ([, value]) => Array.isArray(value),
  ) as Array<[string, string[]]>;

  if (normalizedEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(normalizedEntries);
};

const extractBackendCode = (responseData: unknown): ApiErrorCode | null => {
  if (!responseData || typeof responseData !== "object") {
    return null;
  }

  const data = responseData as BackendErrorResponse;
  const rawCode = data.code ?? data.error_code;

  if (isApiErrorCode(rawCode)) {
    return rawCode;
  }

  return null;
};

const resolveApiErrorCode = (
  error: AxiosError<unknown>,
  status?: STATUS_CODE,
): ApiErrorCode => {
  if (!error.response) {
    return ApiErrorCode.NETWORK_ERROR;
  }

  const backendCode = extractBackendCode(error.response.data);
  if (backendCode) {
    return backendCode;
  }

  if (status) {
    return STATUS_TO_API_ERROR_CODE[status];
  }

  return ApiErrorCode.INTERNAL_SERVER_ERROR;
};

export const mapAxiosErrorToStandardizedError = (
  error: AxiosError<unknown>,
): StandardizedAxiosApiError => {
  const status = toSupportedStatusCode(error.response?.status);
  const code = resolveApiErrorCode(error, status);

  return {
    code,
    message: API_ERROR_MESSAGES[code],
    status,
    validationErrors:
      code === ApiErrorCode.INVALID_PARAMETERS
        ? extractValidationErrors(error.response?.data)
        : undefined,
  };
};

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const standardizedError = mapAxiosErrorToStandardizedError(error);

    return new ApiError({
      message: standardizedError.message,
      uiMessage: standardizedError.message,
      status: standardizedError.status,
      code: standardizedError.code,
      validationErrors: standardizedError.validationErrors,
    });
  }

  const fallbackCode = ApiErrorCode.INTERNAL_SERVER_ERROR;
  const defaultMessage = API_ERROR_MESSAGES[fallbackCode];
  return new ApiError({
    message: defaultMessage,
    uiMessage: defaultMessage,
    code: fallbackCode,
  });
}
