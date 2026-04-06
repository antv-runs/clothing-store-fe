import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

type RetryStateProps = {
  message: string;
  onRetry: () => void;
  retryLabel?: string;
  className?: string;
  disabled?: boolean;
};

export const RetryState = ({
  message,
  onRetry,
  retryLabel = "Retry",
  className,
  disabled = false,
}: RetryStateProps) => {
  return (
    <div className={clsx("retry-state", className)} role="alert">
      <p className="retry-state__message">{message}</p>
      <Button
        type="button"
        variant="primary"
        className="retry-state__button"
        onClick={onRetry}
        disabled={disabled}
      >
        {retryLabel}
      </Button>
    </div>
  );
};
