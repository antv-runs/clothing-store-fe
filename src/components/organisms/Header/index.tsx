import {
  HeaderActions,
  HeaderMenuToggle,
} from "@/components/molecules/HeaderActions";
import { NavMenu } from "@/components/molecules/NavMenu";
import { SearchBox } from "@/components/molecules/SearchBox";
import { AnnouncementBar } from "@/components/organisms/AnnouncementBar";
import "./index.scss";
import { Text } from "@/components/atoms/Text";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

export const Header: React.FC = () => {
  return (
    <>
      <AnnouncementBar />

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

        <HeaderActions />
      </header>
    </>
  );
};
