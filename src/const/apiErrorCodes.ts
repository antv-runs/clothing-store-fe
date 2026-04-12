export const ApiErrorCode = {
  INVALID_PARAMETERS: "E000001",
  UNAUTHORIZED: "E000002",
  FORBIDDEN: "E000003",
  NOT_FOUND: "E000004",
  REQUEST_TIMEOUT: "E000005",
  CONFLICT: "E000006",
  RESOURCE_DELETED: "E000007",
  TOO_MANY_REQUESTS: "E000008",
  INTERNAL_SERVER_ERROR: "E000009",
  TEMPORARY_UNAVAILABLE: "E000010",
  SERVICE_UNAVAILABLE: "E000011",
  GATEWAY_TIMEOUT: "E000012",
  NETWORK_ERROR: "E000013",
} as const;

export type ApiErrorCode = (typeof ApiErrorCode)[keyof typeof ApiErrorCode];

export type STATUS_CODE =
  | 400
  | 401
  | 403
  | 404
  | 408
  | 409
  | 410
  | 422
  | 429
  | 500
  | 502
  | 503
  | 504;

export const API_ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  [ApiErrorCode.INVALID_PARAMETERS]: "Please check your input.",
  [ApiErrorCode.UNAUTHORIZED]: "You are not authorized. Please log in again.",
  [ApiErrorCode.FORBIDDEN]:
    "You do not have permission to perform this action.",
  [ApiErrorCode.NOT_FOUND]: "Requested resource not found.",
  [ApiErrorCode.REQUEST_TIMEOUT]: "The request timed out. Please try again.",
  [ApiErrorCode.CONFLICT]: "This resource already exists.",
  [ApiErrorCode.RESOURCE_DELETED]: "This resource is no longer available.",
  [ApiErrorCode.TOO_MANY_REQUESTS]:
    "Too many requests. Please wait a moment and try again.",
  [ApiErrorCode.INTERNAL_SERVER_ERROR]:
    "Server error. Please try again in a moment.",
  [ApiErrorCode.TEMPORARY_UNAVAILABLE]:
    "Service is temporarily unavailable. Please try again shortly.",
  [ApiErrorCode.SERVICE_UNAVAILABLE]:
    "Service is temporarily unavailable. Please try again shortly.",
  [ApiErrorCode.GATEWAY_TIMEOUT]:
    "Gateway timeout. Please try again in a moment.",
  [ApiErrorCode.NETWORK_ERROR]:
    "Unable to connect. Please check your connection and try again.",
};

export const STATUS_TO_API_ERROR_CODE: Record<STATUS_CODE, ApiErrorCode> = {
  400: ApiErrorCode.INVALID_PARAMETERS,
  401: ApiErrorCode.UNAUTHORIZED,
  403: ApiErrorCode.FORBIDDEN,
  404: ApiErrorCode.NOT_FOUND,
  408: ApiErrorCode.REQUEST_TIMEOUT,
  409: ApiErrorCode.CONFLICT,
  410: ApiErrorCode.RESOURCE_DELETED,
  422: ApiErrorCode.INVALID_PARAMETERS,
  429: ApiErrorCode.TOO_MANY_REQUESTS,
  500: ApiErrorCode.INTERNAL_SERVER_ERROR,
  502: ApiErrorCode.TEMPORARY_UNAVAILABLE,
  503: ApiErrorCode.SERVICE_UNAVAILABLE,
  504: ApiErrorCode.GATEWAY_TIMEOUT,
};

const API_ERROR_CODE_SET = new Set<string>([
  ApiErrorCode.INVALID_PARAMETERS,
  ApiErrorCode.UNAUTHORIZED,
  ApiErrorCode.FORBIDDEN,
  ApiErrorCode.NOT_FOUND,
  ApiErrorCode.REQUEST_TIMEOUT,
  ApiErrorCode.CONFLICT,
  ApiErrorCode.RESOURCE_DELETED,
  ApiErrorCode.TOO_MANY_REQUESTS,
  ApiErrorCode.INTERNAL_SERVER_ERROR,
  ApiErrorCode.TEMPORARY_UNAVAILABLE,
  ApiErrorCode.SERVICE_UNAVAILABLE,
  ApiErrorCode.GATEWAY_TIMEOUT,
  ApiErrorCode.NETWORK_ERROR,
]);

const GLOBAL_MUTATION_ERROR_CODE_SET = new Set<ApiErrorCode>([
  ApiErrorCode.NETWORK_ERROR,
  ApiErrorCode.INTERNAL_SERVER_ERROR,
  ApiErrorCode.TEMPORARY_UNAVAILABLE,
  ApiErrorCode.SERVICE_UNAVAILABLE,
  ApiErrorCode.GATEWAY_TIMEOUT,
]);

export const isApiErrorCode = (value: unknown): value is ApiErrorCode => {
  return typeof value === "string" && API_ERROR_CODE_SET.has(value);
};

export const isSupportedStatusCode = (
  status: number,
): status is STATUS_CODE => {
  return status in STATUS_TO_API_ERROR_CODE;
};

export const isGlobalMutationErrorCode = (code: ApiErrorCode): boolean => {
  return GLOBAL_MUTATION_ERROR_CODE_SET.has(code);
};
