import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

/**
 * Centralized error reporter for production telemetry integration (Sentry, Datadog, etc).
 */
export const reportError = (error: Error, errorInfo?: ErrorInfo) => {
  console.error("Reported Error:", error, errorInfo);
};

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface Props {
  children?: ReactNode;
  fallbackMessage?: string;
  fallback?: ReactNode;
  fallbackRender?: (props: FallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: ReadonlyArray<unknown>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
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
      nextResetKeys.some((value, index) => !Object.is(value, prevResetKeys[index]))
    ) {
      this.setState({ hasError: false, error: null });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
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
        <div className="container u-mt-25">
          <section className="error-boundary-page" aria-label="Application Error">
            <div className="error-boundary-page__content">
              <Heading as="h1" className="error-boundary-page__title">
                {this.props.fallbackMessage || "Something went wrong"}
              </Heading>

              <p className="error-boundary-page__message">
                We're sorry, an unexpected error occurred while loading this page.
              </p>

              <div className="error-boundary-page__actions">
                <Button
                  className="error-boundary-page__action"
                  type="button"
                  variant="primary"
                  onClick={this.handleRetry}
                  unstyled
                >
                  Try Again
                </Button>
                <div className="error-boundary-page__spacer" />
                <Button
                  className="error-boundary-page__action"
                  type="button"
                  variant="secondary"
                  onClick={this.handleGoHome}
                  unstyled
                >
                  Go back to Home
                </Button>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}
