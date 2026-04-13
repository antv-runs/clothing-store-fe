import React from "react";
import { BreadcrumbItem } from "@/components/molecules/BreadcrumbItem";
import "./index.scss";

interface BreadcrumbProps {
  items: string[];
  className?: string;
  id?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "u-mb-40",
  id = "breadcrumb-list",
}) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol
        id={id}
        className={["breadcrumb__list", className].filter(Boolean).join(" ")}
      >
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
