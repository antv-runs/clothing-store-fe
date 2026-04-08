export const LIST_ERROR_KIND = {
  INVALID_PARAMS: "invalid_params",
  INVALID_STATE: "invalid_state",
  NETWORK: "network",
  SERVER: "server",
  MALFORMED_DATA: "malformed_data",
  UNKNOWN: "unknown",
} as const;

export type ListErrorKind =
  (typeof LIST_ERROR_KIND)[keyof typeof LIST_ERROR_KIND];

export type ListCoreState<TData> = {
  data: TData[];
  isLoading: boolean;
  isRetrying: boolean;
  isRetryable?: boolean;
  isEmpty: boolean;
  error: string | null;
  errorKind: ListErrorKind | null;
  retry: () => void;
  invalidState?: string | null;
  invalidParams?: string | null;
};
