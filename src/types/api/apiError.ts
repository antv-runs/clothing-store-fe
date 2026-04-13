import type { ApiErrorCode, STATUS_CODE } from "@/const/apiErrorCodes";

export interface NormalizedApiError {
  isApiError: true;
  status?: STATUS_CODE;
  code: ApiErrorCode;
  message: string;
  uiMessage: string;
  validationErrors?: Record<string, string[]>;
}
