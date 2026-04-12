import type { ApiErrorCode, STATUS_CODE } from "@/const/apiErrorCodes";

export interface StandardizedApiError {
  code: ApiErrorCode;
  status?: STATUS_CODE;
  message: string;
}
