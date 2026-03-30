import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/Icon/Icon";
import "./IconButton.scss";

type IconButtonVariant = "default" | "ghost";

type IconButtonProps = {
  svgName: string;
  ariaLabel: string;
  color?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  className?: string;
  variant?: IconButtonVariant;
  type?: "button" | "submit" | "reset";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "type">;

function IconButton({
  svgName,
  ariaLabel,
  color,
  iconWidth = 20,
  iconHeight = 20,
  className,
  variant = "default",
  type = "button",
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx("icon-button", `icon-button--${variant}`, className)}
      aria-label={ariaLabel}
      {...buttonProps}
    >
      <Icon
        svgName={svgName}
        width={iconWidth}
        height={iconHeight}
        color={color}
      />
    </button>
  );
}

export default React.memo(IconButton);
