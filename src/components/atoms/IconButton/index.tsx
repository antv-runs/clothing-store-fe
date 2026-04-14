import React from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { ICON_DEFAULT_SIZE } from "@/const/ui";
import "./index.scss";

type IconButtonVariant = "default" | "ghost" | "circular";

type IconButtonProps = {
  svgName: string;
  ariaLabel: string;
  color?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  className?: string;
  variant?: IconButtonVariant;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">;

const IconButtonComponent = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      svgName,
      ariaLabel,
      color,
      iconWidth = ICON_DEFAULT_SIZE,
      iconHeight = ICON_DEFAULT_SIZE,
      className,
      variant = "default",
      type = "button",
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
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
);

IconButtonComponent.displayName = "IconButton";

export const IconButton = React.memo(IconButtonComponent);

