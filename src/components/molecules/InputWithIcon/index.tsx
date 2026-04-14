import type { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { toCssDimension } from "@/utils/css";
import "./index.scss";

type IconPosition = "outside-start" | "inline-start";

type InputWithIconProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  iconName: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
  inputClassName?: string;
  iconClassName?: string;
  ariaLabel?: string;
  disabled?: boolean;
  iconPosition?: IconPosition;
  iconWidth?: number | string;
  iconHeight?: number | string;
  value?: string | number | readonly string[];
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  ariaInvalid?: boolean;
  isInvalid?: boolean;
};

export const InputWithIcon = ({
  iconName,
  placeholder,
  type = "text",
  className,
  inputClassName,
  iconClassName,
  ariaLabel,
  disabled = false,
  iconPosition = "outside-start",
  iconWidth = 20.25,
  iconHeight = 15.75,
  value,
  name,
  onChange,
  onBlur,
  inputRef,
  ariaInvalid,
  isInvalid = false,
  style,
  ...rest
}: InputWithIconProps) => {
  const rootStyle = {
    "--input-with-icon-width": toCssDimension(iconWidth),
    "--input-with-icon-height": toCssDimension(iconHeight),
    ...style
  } as CSSProperties;

  return (
    <div
      className={clsx(
        "input-with-icon",
        `input-with-icon--${iconPosition}`,
        isInvalid && "input-with-icon--error",
        className,
      )}
      style={rootStyle}
      {...rest}
    >
      <span className={clsx("input-with-icon__icon", iconClassName)}>
        <Icon svgName={iconName} width={iconWidth} height={iconHeight} />
      </span>
      <Input
        inputRef={inputRef}
        type={type}
        name={name}
        className={clsx("input-with-icon__input", inputClassName)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        unstyled
      />
    </div>
  );
};
