import type { LiHTMLAttributes } from "react";
import { Text } from "@/components/atoms/Text";
import { TextLink } from "@/components/atoms/TextLink";
import clsx from "clsx";
import "./index.scss";

type BreadcrumbItemProps = LiHTMLAttributes<HTMLLIElement> & {
  label: string;
  href?: string;
  isActive?: boolean;
};

/**
 * BreadcrumbItem molecule - Individual breadcrumb item
 * Can be a link or current page marker
 */
export const BreadcrumbItem = ({
  label,
  href,
  isActive = false,
  className,
  ...rest
}: BreadcrumbItemProps) => {
  if (isActive) {
    return (
      <li
        className={clsx("breadcrumb__item breadcrumb__item--active", className)}
        aria-current="page"
        {...rest}
      >
        <Text as="span" className="breadcrumb__current">
          {label}
        </Text>
      </li>
    );
  }

  return (
    <li className={clsx("breadcrumb__item", className)} {...rest}>
      <TextLink href={href || "#"} className="breadcrumb__link">
        {label}
      </TextLink>
    </li>
  );
};
