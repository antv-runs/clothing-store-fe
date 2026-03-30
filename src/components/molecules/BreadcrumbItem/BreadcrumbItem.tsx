import React from "react";
import { Text, TextLink } from "@/components/atoms";

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
      <li aria-current="page">
        <Text as="span">{label}</Text>
      </li>
    );
  }

  return (
    <li>
      <TextLink href={href || "#"}>{label}</TextLink>
    </li>
  );
};
