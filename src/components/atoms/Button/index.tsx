import "./index.scss";
import clsx from "clsx";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  unstyled?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  unstyled = false,
  isLoading = false,
  loadingText,
  className,
  type = "button",
  disabled,
  style,
  ...buttonProps
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [stableSize, setStableSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const buttonElement = buttonRef.current;

    if (!buttonElement) {
      return;
    }

    const updateStableSize = () => {
      const nextSize = {
        width: buttonElement.offsetWidth,
        height: buttonElement.offsetHeight,
      };

      setStableSize((currentSize) => {
        if (
          currentSize &&
          currentSize.width === nextSize.width &&
          currentSize.height === nextSize.height
        ) {
          return currentSize;
        }

        return nextSize;
      });
    };

    if (isLoading) {
      updateStableSize();
      return;
    }

    updateStableSize();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateStableSize();
    });

    resizeObserver.observe(buttonElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, isLoading, loadingText]);

  const loadingLockStyle: CSSProperties =
    isLoading && stableSize
      ? {
          width: `${stableSize.width}px`,
          height: `${stableSize.height}px`,
        }
      : {};

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={clsx(
        !unstyled && "button",
        !unstyled && `button--${variant}`,
        className,
      )}
      style={{ ...style, ...loadingLockStyle }} // remove
      {...buttonProps}
    >
      <span
        className={clsx(
          !unstyled && "button__content",
          isLoading && !unstyled && "button__content--hidden",
        )}
        aria-hidden={isLoading || undefined}
      >
        {children}
      </span>

      {isLoading && !unstyled && (
        <span className="button__loading" role="status" aria-live="polite">
          <span className="button__spinner" aria-hidden="true" />
          {loadingText && (
            <span className="button__loading-text">{loadingText}</span>
          )}
          {!loadingText && <span className="button__sr-only">Loading</span>}
        </span>
      )}

      {isLoading && unstyled && (loadingText ?? children)}
    </button>
  );
};
