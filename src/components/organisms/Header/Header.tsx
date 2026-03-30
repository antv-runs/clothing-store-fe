import {
  HeaderActions,
  HeaderMenuToggle,
} from "@/components/molecules/HeaderActions/HeaderActions";
import { NavMenu } from "@/components/molecules/NavMenu/NavMenu";
import { SearchBox } from "@/components/molecules/SearchBox/SearchBox";
import { AnnouncementBar } from "./AnnouncementBar/AnnouncementBar";
import "./Header.scss";
import { Text } from "@/components/atoms/Text/Text";

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
        <Text as="p" className="logo">
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
