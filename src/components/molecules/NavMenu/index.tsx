import { Icon } from "@/components/atoms/Icon";
import { TextLink } from "@/components/atoms/TextLink";
import "./NavMenu.scss";

type NavMenuItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavMenuItem[] = [
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "On Sale", href: "#" },
  { label: "New Arrivals", href: "#" },
  { label: "Brands", href: "#" },
];

export const NavMenu: React.FC = () => {
  return (
    <nav className="header-links" aria-label="Main navigation">
      <ul id="nav-categories">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <TextLink href={item.href}>
              {item.label}
              {item.hasDropdown ? (
                <span className="header-links__arrow" aria-hidden="true">
                  <Icon svgName="icn_arrow_down" width={10} height={10} />
                </span>
              ) : null}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
