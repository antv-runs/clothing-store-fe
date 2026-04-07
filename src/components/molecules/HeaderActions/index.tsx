import type { ComponentProps } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

type HeaderMenuToggleProps = Omit<ComponentProps<typeof IconButton>, "type">;

export const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = (props) => {
  return <IconButton type="button" {...props} />;
};

export interface HeaderActionsProps {
  totalQuantity: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  totalQuantity,
  onCartClick,
  onProfileClick,
}) => {
  return (
    <div className="header-icon">
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
          <span className="header-icon__cart-badge">{totalQuantity}</span>
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
