import type { HTMLAttributes } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Input } from "@/components/atoms/Input";
import clsx from "clsx";
import "./index.scss";

type SearchBoxProps = HTMLAttributes<HTMLFormElement> & {
  action?: string;
};

export const SearchBox = ({ action = "#", className, ...rest }: SearchBoxProps) => {
  return (
    <form action={action} className={clsx("header-search", className)} {...rest}>
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
