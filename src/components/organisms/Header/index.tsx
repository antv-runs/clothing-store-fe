import {
  HeaderActions,
  HeaderMenuToggle,
} from "@/components/molecules/HeaderActions";
import { NavMenu } from "@/components/molecules/NavMenu";
import { SearchBox } from "@/components/molecules/SearchBox";
import { AnnouncementBar } from "@/components/organisms/AnnouncementBar";
import "./index.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/reducers/cartReducer";

export const Header: React.FC = () => {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const navigate = useNavigate();
  const totalQuantity = useSelector(selectCartItemCount);

  const handleCartClick = () => navigate(ROUTES.CART);

  return (
    <>
      {isAnnouncementVisible && (
        <AnnouncementBar onClose={() => setIsAnnouncementVisible(false)} />
      )}

      <header className="site-header">
        <HeaderMenuToggle
          className="header-menu-toggle"
          ariaLabel="Open menu"
          svgName="icn_menu"
          iconWidth={19}
          iconHeight={15}
        />
        <Link to={ROUTES.HOME} className="logo">
          SHOP.CO
        </Link>

        <NavMenu />

        <SearchBox />

        <HeaderActions
          totalQuantity={totalQuantity}
          onCartClick={handleCartClick}
        />
      </header>
    </>
  );
};
