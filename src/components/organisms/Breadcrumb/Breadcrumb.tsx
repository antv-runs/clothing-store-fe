import React from "react";
import { BreadcrumbItem } from "../../molecules/BreadcrumbItem/BreadcrumbItem";

interface BreadcrumbProps {
  items: string[];
  className?: string;
  id?: string;
}

/**
 * Breadcrumb organism - Full breadcrumb navigation
 * Renders list of breadcrumb items with proper ARIA attributes
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "cart-page__breadcrumb product-breadcrumb js-breadcrumb-list u-mb-40",
  id = "breadcrumb-list",
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol id={id} className={className}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem
              key={`${item}-${index}`}
              label={item}
              isActive={isLast}
            />
          );
        })}
      </ol>
    </nav>
  );
};
