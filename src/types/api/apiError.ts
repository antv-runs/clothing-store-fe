import type { ApiErrorCode, STATUS_CODE } from "@/const/apiErrorCodes";

export type ValidationErrorMap = Record<string, string[]>;

export interface NormalizedApiError {
  isApiError: true;
  status?: STATUS_CODE;
  code: ApiErrorCode;
  message: string;
  uiMessage: string;
  validationErrors?: ValidationErrorMap;
}
