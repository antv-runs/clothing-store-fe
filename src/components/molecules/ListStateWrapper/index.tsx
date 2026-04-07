import type { ReactNode } from "react";
import clsx from "clsx";
import { RetryState } from "@/components/molecules/RetryState";
import type { ListErrorKind } from "@/types/listState";
import "./index.scss";

type ListStateWrapperProps = {
  isLoading: boolean;
  isRetrying: boolean;
  isEmpty: boolean;
  error: string | null;
  errorKind?: ListErrorKind | null;
  onRetry?: () => void;
  isRetryable?: boolean;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;
  className?: string;
  children: ReactNode;
};

const DEFAULT_EMPTY_MESSAGE = "No items available.";
const DEFAULT_ERROR_MESSAGE = "Unable to load this list right now.";

export const ListStateWrapper = ({
  isLoading,
  isRetrying,
  isEmpty,
  error,
  errorKind,
  onRetry,
  isRetryable = true,
  loadingContent,
  emptyContent,
  className,
  children,
}: ListStateWrapperProps) => {
  if (error || isRetrying) {
    return (
      <RetryState
        className={clsx("list-state-wrapper__retry", className)}
        message={error || DEFAULT_ERROR_MESSAGE}
        onRetry={onRetry || (() => undefined)}
        disabled={!onRetry || !isRetryable || errorKind === "invalid_state"}
        isRetrying={isRetrying}
      />
    );
  }

  if (isLoading) {
    return <>{loadingContent || null}</>;
  }

  if (isEmpty) {
    return (
      <>
        {emptyContent || (
          <p
            className={clsx("list-state-wrapper__empty", className)}
            role="status"
          >
            {DEFAULT_EMPTY_MESSAGE}
          </p>
        )}
      </>
    );
  }

  return <>{children}</>;
};
