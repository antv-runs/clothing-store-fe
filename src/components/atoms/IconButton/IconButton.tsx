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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function IconButton({
  svgName,
  ariaLabel,
  color,
  iconWidth = 20,
  iconHeight = 20,
  onClick,
  className,
  disabled = false,
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx("icon-button", className)}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
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
