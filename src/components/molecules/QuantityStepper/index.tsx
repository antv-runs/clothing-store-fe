import React from "react";
import { IconButton } from "@/components/atoms/IconButton";

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
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  iconWidth?: number | string;
  iconHeight?: number | string;
  onDecrease?: React.MouseEventHandler<HTMLButtonElement>;
  onIncrease?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * QuantityStepper - shared quantity control structure.
 * Keeps layout styling in the parent while owning the repeated stepper markup.
 */
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
  step = 1,
  readOnly = false,
  disabled = false,
  iconWidth = 20,
  iconHeight = 20,
  onDecrease,
  onIncrease,
  onChange,
}) => {
  const handleSubmit = readOnly
    ? (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }
    : undefined;

  return (
    <form
      action={action}
      className={className}
      aria-label={ariaLabel}
      onSubmit={handleSubmit}
    >
      <IconButton
        svgName="icn_minus"
        className={decrementButtonClassName}
        ariaLabel="Decrease quantity"
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        type="button"
        disabled={disabled}
        onClick={onDecrease}
      />
      <input
        id={inputId}
        className={inputClassName}
        type="number"
        min={min}
        step={step}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        aria-label="Quantity"
        onChange={onChange}
      />
      <IconButton
        svgName="icn_plus"
        className={incrementButtonClassName}
        ariaLabel="Increase quantity"
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        type="button"
        disabled={disabled}
        onClick={onIncrease}
      />
    </form>
  );
};
