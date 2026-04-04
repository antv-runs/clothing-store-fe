export interface NormalizedApiError {
  isApiError: true;
  status?: number;
  code?: string;
  message: string;
  uiMessage: string;
  validationErrors?: Record<string, string[]>;
}
