import type { ComponentProps } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

type HeaderMenuToggleProps = Omit<ComponentProps<typeof IconButton>, "type">;

export const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = (props) => {
  return <IconButton type="button" {...props} />;
};

export const HeaderActions: React.FC = () => {
  return (
    <div className="header-icon">
      <IconButton
        className="header-icon__cart"
        type="button"
        ariaLabel="Cart"
        svgName="icn_cart"
        iconWidth={23}
        iconHeight={21}
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
