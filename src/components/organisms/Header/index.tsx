import {
  HeaderActions,
  HeaderMenuToggle,
} from "@/components/molecules/HeaderActions";
import { NavMenu } from "@/components/molecules/NavMenu";
import { SearchBox } from "@/components/molecules/SearchBox";
import { AnnouncementBar } from "@/components/organisms/AnnouncementBar";
import "./index.scss";
import { Text } from "@/components/atoms/Text";

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
