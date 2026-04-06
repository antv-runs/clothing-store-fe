import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

type RetryStateProps = {
  message: string;
  onRetry: () => void;
  retryLabel?: string;
  retryingLabel?: string;
  className?: string;
  disabled?: boolean;
  isRetrying?: boolean;
};

export const RetryState = ({
  message,
  onRetry,
  retryLabel = "Retry",
  retryingLabel = "Retrying...",
  className,
  disabled = false,
  isRetrying = false,
}: RetryStateProps) => {
  const isButtonDisabled = disabled || isRetrying;

  return (
    <div className={clsx("retry-state", className)} role="alert">
      <p className="retry-state__message">{message}</p>
      <Button
        type="button"
        variant="primary"
        className="retry-state__button"
        onClick={onRetry}
        disabled={isButtonDisabled}
        aria-disabled={isButtonDisabled}
      >
        {isRetrying ? retryingLabel : retryLabel}
      </Button>
    </div>
  );
};
