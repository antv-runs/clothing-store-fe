import React from "react";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import "./IconButton.scss";

type IconButtonProps = {
  svgName: string;
  ariaLabel: string;
  color?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  className?: string;
  type?: "button" | "submit" | "reset";
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "type"
>;

function IconButton({
  svgName,
  ariaLabel,
  color,
  iconWidth = 20,
  iconHeight = 20,
  className,
  type = "button",
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx("icon-button", className)}
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
