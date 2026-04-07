export type ListErrorKind =
  | "invalid_params"
  | "invalid_state"
  | "network"
  | "server"
  | "malformed_data"
  | "unknown";

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
