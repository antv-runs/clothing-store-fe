import IconButton from "@/components/atoms/IconButton";
import { Input } from "@/components/atoms/Input";
import "./SearchBox.scss";

type SearchBoxProps = {
  action?: string;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ action = "#" }) => {
  return (
    <form action={action} className="header-search">
      <Input
        type="text"
        placeholder="Search for products..."
        aria-label="Search for products"
        unstyled
      />
      <IconButton
        svgName="icn_search"
        className="header-search__button"
        ariaLabel="Search products"
        iconWidth={21}
        iconHeight={21}
      />
    </form>
  );
};
