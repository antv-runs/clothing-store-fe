import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEventHandler,
  type ButtonHTMLAttributes,
} from "react";
import clsx from "clsx";
import { UI_TEXT } from "@/const/messages";
import "./index.scss";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  unstyled?: boolean;
  isLoading?: boolean;
  loadingText?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: ButtonHTMLAttributes<HTMLButtonElement>["aria-haspopup"];
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

/**
 * Button atom - Strict implementation for interactive actions.
 * Handles loading states with stable size preservation to prevent layout shifts.
 */
export const Button = ({
  children,
  variant = "primary",
  unstyled = false,
  isLoading = false,
  loadingText,
  className,
  type = "button",
  disabled,
  id,
  onClick,
  title,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  "aria-haspopup": ariaHasPopup,
  onKeyDown,
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
      id={id}
      ref={buttonRef}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-haspopup={ariaHasPopup}
      title={title}
      className={clsx(
        !unstyled && "button",
        !unstyled && `button--${variant}`,
        className,
      )}
      style={loadingLockStyle}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
          {!loadingText && <span className="button__sr-only">{UI_TEXT.LOADING}</span>}
        </span>
      )}

      {isLoading && unstyled && (loadingText ?? children)}
    </button>
  );
};

