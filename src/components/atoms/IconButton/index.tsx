import { forwardRef, memo, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { ICON_DEFAULT_SIZE } from "@/const/config";
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
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  title?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: ButtonHTMLAttributes<HTMLButtonElement>["aria-haspopup"];
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
};

/**
 * IconButton atom - Strict implementation for icon-only actions.
 */
const IconButtonComponent = forwardRef<HTMLButtonElement, IconButtonProps>(
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
      disabled,
      onClick,
      id,
      title,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-haspopup": ariaHasPopup,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      tabIndex,
    },
    ref
  ) => {
    return (
      <button
        id={id}
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx("icon-button", `icon-button--${variant}`, className)}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
        title={title}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        tabIndex={tabIndex}
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

export const IconButton = memo(IconButtonComponent);

