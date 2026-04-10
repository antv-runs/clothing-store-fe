import type { CSSProperties } from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import "./index.scss";

type IconPosition = "outside-start" | "inline-start";

type InputWithIconProps = {
  iconName: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
  className?: string;
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

function toCssDimension(value?: number | string) {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
}

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
}: InputWithIconProps) => {
  const style = {
    "--input-with-icon-width": toCssDimension(iconWidth),
    "--input-with-icon-height": toCssDimension(iconHeight),
  } as CSSProperties;

  return (
    <div
      className={clsx(
        "input-with-icon",
        `input-with-icon--${iconPosition}`,
        className,
      )}
      style={style}
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
