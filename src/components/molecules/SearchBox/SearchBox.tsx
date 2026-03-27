import IconButton from "../../atoms/IconButton/IconButton";
import "./SearchBox.scss";

type SearchBoxProps = {
  action?: string;
};

export const SearchBox: React.FC<SearchBoxProps> = ({ action = "#" }) => {
  return (
    <form action={action} className="header-search">
      <input
        type="text"
        placeholder="Search for products..."
        aria-label="Search for products"
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
