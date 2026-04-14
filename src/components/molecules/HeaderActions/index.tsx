import type { ComponentProps, HTMLAttributes } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import clsx from "clsx";
import "./index.scss";

type HeaderMenuToggleProps = Omit<ComponentProps<typeof IconButton>, "type">;

export const HeaderMenuToggle = (props: HeaderMenuToggleProps) => {
  return <IconButton type="button" {...props} />;
};

export type HeaderActionsProps = HTMLAttributes<HTMLDivElement> & {
  totalQuantity: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
};

export const HeaderActions = ({
  totalQuantity,
  onCartClick,
  onProfileClick,
  className,
  ...rest
}: HeaderActionsProps) => {
  const displayCount = totalQuantity > 99 ? "99+" : totalQuantity;

  return (
    <div className={clsx("header-icon", className)} {...rest}>
      <div className="header-icon__cart-wrapper">
        <IconButton
          className="header-icon__cart"
          type="button"
          ariaLabel="Cart"
          svgName="icn_cart"
          iconWidth={23}
          iconHeight={21}
          onClick={onCartClick}
        />
        {totalQuantity > 0 && (
          <span className="header-icon__cart-badge">{displayCount}</span>
        )}
      </div>
      <IconButton
        className="header-icon__profile"
        type="button"
        ariaLabel="Profile"
        svgName="icn_profile"
        iconWidth={21}
        iconHeight={21}
        onClick={onProfileClick}
      />
    </div>
  );
};
