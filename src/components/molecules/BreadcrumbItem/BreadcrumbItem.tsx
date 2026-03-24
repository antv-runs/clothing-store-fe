import React from "react";

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
        <span>{label}</span>
      </li>
    );
  }

  return (
    <li>
      <a href={href || "#"}>{label}</a>
    </li>
  );
};
