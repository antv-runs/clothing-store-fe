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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
  onChange,
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
        className,
      )}
      style={rootStyle}
      {...rest}
    >
      <figure className={clsx("input-with-icon__icon", iconClassName)}>
        <Icon svgName={iconName} width={iconWidth} height={iconHeight} />
      </figure>
      <Input
        type={type}
        className={clsx("input-with-icon__input", inputClassName)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
        value={value}
        onChange={onChange}
        unstyled
      />
    </div>
  );
};
