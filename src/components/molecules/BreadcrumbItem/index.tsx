import React from "react";
import { Text } from "@/components/atoms/Text";
import { TextLink } from "@/components/atoms/TextLink";
import "./index.scss";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
}

/**
 * BreadcrumbItem molecule - Individual breadcrumb item
 * Can be a link or current page marker
 */
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  href,
  isActive = false,
}) => {
  if (isActive) {
    return (
      <li
        className="breadcrumb__item breadcrumb__item--active"
        aria-current="page"
      >
        <Text as="span" className="breadcrumb__current">
          {label}
        </Text>
      </li>
    );
  }

  return (
    <li className="breadcrumb__item">
      <TextLink href={href || "#"} className="breadcrumb__link">
        {label}
      </TextLink>
    </li>
  );
};
