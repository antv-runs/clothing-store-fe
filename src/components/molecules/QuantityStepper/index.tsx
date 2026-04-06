import React from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

interface QuantityStepperProps {
  className?: string;
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
  onDecrease?: React.MouseEventHandler<HTMLButtonElement>;
  onIncrease?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
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
  onChange,
}) => {
  const currentValue = value !== undefined ? value : (defaultValue !== undefined ? defaultValue : min);

  const isMinusDisabled = disabled || currentValue <= min;
  const isPlusDisabled = disabled || (max !== undefined && currentValue >= max);

  const handleDecrease: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!isMinusDisabled) {
      onDecrease?.(e);
    }
  };

  const handleIncrease: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!isPlusDisabled) {
      onIncrease?.(e);
    }
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
      onSubmit={handleSubmit}
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
      />
      <IconButton
        svgName="icn_plus"
        className={clsx("quantity-stepper__button", incrementButtonClassName)}
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
