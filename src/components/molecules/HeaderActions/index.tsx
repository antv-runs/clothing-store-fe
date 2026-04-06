import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import { ROUTES } from "@/routes/paths";

type HeaderMenuToggleProps = Omit<ComponentProps<typeof IconButton>, "type">;

export const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = (props) => {
  return <IconButton type="button" {...props} />;
};

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="header-icon">
      <IconButton
        className="header-icon__cart"
        type="button"
        ariaLabel="Cart"
        svgName="icn_cart"
        iconWidth={23}
        iconHeight={21}
        onClick={() => navigate(ROUTES.CART)}
      />
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
