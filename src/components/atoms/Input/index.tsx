import type { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import clsx from "clsx";
import "./index.scss";

type InputProps = {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  id?: string;
  className?: string;
  unstyled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
};

/**
 * Input atom - Strict implementation for user data entry.
 */
export const Input = ({
  value,
  defaultValue,
  placeholder,
  type = "text",
  name,
  disabled,
  readOnly,
  required,
  autoFocus,
  autoComplete,
  id,
  className,
  unstyled = false,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: InputProps) => {
  return (
    <input
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      id={id}
      className={clsx(!unstyled && "input", className)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
    />
  );
};
