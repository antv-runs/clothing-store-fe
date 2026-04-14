import { logger } from "@/utils/logger";
import { Component, Fragment } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ERROR_MESSAGES } from "@/const/errorMessages";
import { UI_TEXT } from "@/const/uiText";
import { isChunkLoadError } from "@/utils/chunkLoadError";
import "./index.scss";

/**
 * Centralized error reporter for production telemetry integration (Sentry, Datadog, etc).
 */
export const reportError = (error: Error, errorInfo?: ErrorInfo) => {
  logger.error("Reported Error:", error, errorInfo);
};

export type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type Props = {
  children?: ReactNode;
  fallbackMessage?: string;
  fallback?: ReactNode;
  fallbackRender?: (props: FallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: ReadonlyArray<unknown>;
};

type State = {
  hasError: boolean;
  error: Error | null;
  retryKey: number;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    retryKey: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    reportError(error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props) {
    if (!this.state.hasError) {
      return;
    }

    const prevResetKeys = prevProps.resetKeys;
    const nextResetKeys = this.props.resetKeys;

    if (!prevResetKeys || !nextResetKeys) {
      return;
    }

    if (
      prevResetKeys.length !== nextResetKeys.length ||
      nextResetKeys.some(
        (value, index) => !Object.is(value, prevResetKeys[index]),
      )
    ) {
      this.setState((prev) => ({
        hasError: false,
        error: null,
        retryKey: prev.retryKey + 1,
      }));
    }
  }

  private handleRetry = () => {
    if (isChunkLoadError(this.state.error)) {
      window.location.reload();
      return;
    }

    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryKey: prev.retryKey + 1,
    }));
  };

  private handleGoHome = () => {
    // We use window.location because the router might be broken
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error || new Error("Unknown error"),
          resetErrorBoundary: this.handleRetry,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section className="error-boundary-page container u-mt-25">
          <div className="error-boundary-page__content">
            <Heading as="h1" className="error-boundary-page__title">
              {this.props.fallbackMessage || ERROR_MESSAGES.GENERIC_ERROR}
            </Heading>

            <p className="error-boundary-page__message">
              {isChunkLoadError(this.state.error)
                ? ERROR_MESSAGES.PAGE_RESOURCE_LOAD
                : ERROR_MESSAGES.PAGE_LOAD_UNEXPECTED}
            </p>

            <div className="error-boundary-page__actions">
              <Button
                className="error-boundary-page__action"
                type="button"
                variant="primary"
                onClick={this.handleRetry}
              >
                {UI_TEXT.TRY_AGAIN}
              </Button>
              <Button
                className="error-boundary-page__action"
                type="button"
                variant="primary"
                onClick={this.handleGoHome}
              >
                {UI_TEXT.GO_BACK_TO_HOME}
              </Button>
            </div>
          </div>
        </section>
      );
    }

    return <Fragment key={this.state.retryKey}>{this.props.children}</Fragment>;
  }
}
