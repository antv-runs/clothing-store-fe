import {
  HeaderActions,
  HeaderMenuToggle,
} from "../../molecules/HeaderActions/HeaderActions";
import { NavMenu } from "../../molecules/NavMenu/NavMenu";
import { SearchBox } from "../../molecules/SearchBox/SearchBox";
import { AnnouncementBar } from "../AnnouncementBar/AnnouncementBar";
import "./Header.scss";
import { Text } from "../../atoms/Text/Text";

const Header: React.FC = () => {
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
        <Text as="h1" className="logo">
          SHOP.CO
        </Text>

        <NavMenu />

        <SearchBox />

        <HeaderActions />
      </header>
    </>
  );
};

export default Header;
