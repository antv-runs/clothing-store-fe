export type ListErrorKind =
  | "network"
  | "not_found"
  | "validation"
  | "system"
  | "unknown";

export type ListCoreState<TData> = {
  data: TData[];
  isLoading: boolean;
  isRetrying: boolean;
  isEmpty: boolean;
  error: string | null;
  errorKind: ListErrorKind | null;
  retry: () => void;
  invalidState?: string | null;
  invalidParams?: string | null;
};
