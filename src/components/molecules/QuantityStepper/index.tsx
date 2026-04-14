import type { HTMLAttributes, MouseEventHandler, ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

type QuantityStepperProps = Omit<HTMLAttributes<HTMLFormElement>, "onChange" | "onBlur" | "onKeyDown"> & {
  ariaLabel?: string;
  action?: string;
  inputId?: string;
  inputClassName?: string;
  decrementButtonClassName?: string;
  incrementButtonClassName?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  iconWidth?: number | string;
  iconHeight?: number | string;
  onDecrease?: MouseEventHandler<HTMLButtonElement>;
  onIncrease?: MouseEventHandler<HTMLButtonElement>;
  onMaxReached?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export const QuantityStepper = ({
  className,
  ariaLabel,
  action,
  inputId,
  inputClassName,
  decrementButtonClassName,
  incrementButtonClassName,
  value,
  defaultValue,
  min = 1,
  max,
  step = 1,
  readOnly = false,
  disabled = false,
  iconWidth = 20,
  iconHeight = 20,
  onDecrease,
  onIncrease,
  onMaxReached,
  onChange,
  onBlur,
  onKeyDown,
  onSubmit,
  ...rest
}: QuantityStepperProps) => {
  const currentValue = value !== undefined ? value : (defaultValue !== undefined ? defaultValue : min);

  const isMinusDisabled = disabled || currentValue <= min;
  const isAtMax = max !== undefined && currentValue >= max;
  const isPlusDisabled = disabled;

  const handleDecrease: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!isMinusDisabled) {
      onDecrease?.(e);
    }
  };

  const handleIncrease: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isPlusDisabled) {
      return;
    }

    if (isAtMax) {
      onMaxReached?.(e);
      return;
    }

    onIncrease?.(e);
  };

  const handleSubmit = readOnly
    ? (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
    : undefined;

  return (
    <form
      action={action}
      className={clsx("quantity-stepper", className)}
      aria-label={ariaLabel}
      onSubmit={handleSubmit || onSubmit}
      {...rest}
    >
      <IconButton
        svgName="icn_minus"
        className={clsx("quantity-stepper__button", decrementButtonClassName)}
        ariaLabel="Decrease quantity"
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        type="button"
        disabled={isMinusDisabled}
        onClick={handleDecrease}
      />
      <input
        id={inputId}
        className={clsx("quantity-stepper__input", inputClassName)}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        aria-label="Quantity"
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <IconButton
        svgName="icn_plus"
        className={clsx(
          "quantity-stepper__button",
          isAtMax && "quantity-stepper__button--disabled",
          incrementButtonClassName,
        )}
        ariaLabel="Increase quantity"
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        type="button"
        disabled={isPlusDisabled}
        onClick={handleIncrease}
      />
    </form>
  );
};
