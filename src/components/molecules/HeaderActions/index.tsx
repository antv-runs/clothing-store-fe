import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/cartStore";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import { ROUTES } from "@/routes/paths";

type HeaderMenuToggleProps = Omit<ComponentProps<typeof IconButton>, "type">;

export const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = (props) => {
  return <IconButton type="button" {...props} />;
};

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
          onClick={() => navigate(ROUTES.CART)}
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
      />
    </div>
  );
};
