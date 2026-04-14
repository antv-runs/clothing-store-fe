import type { HTMLAttributes } from "react";
import { BreadcrumbItem } from "@/components/molecules/BreadcrumbItem";
import type { BreadcrumbItemData } from "@/types/breadcrumb";
import clsx from "clsx";
import "./index.scss";

type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItemData[];
};

export const Breadcrumb = ({
  items,
  className = "u-mb-40",
  id = "breadcrumb-list",
  ...rest
}: BreadcrumbProps) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" {...rest}>
      <ol id={id} className={clsx("breadcrumb__list", className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem
              key={`${item.label}-${index}`}
              label={item.label}
              href={item.href}
              isActive={isLast}
            />
          );
        })}
      </ol>
    </nav>
  );
};
