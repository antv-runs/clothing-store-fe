import type { HTMLAttributes } from "react";
import { BreadcrumbItem } from "@/components/molecules/BreadcrumbItem";
import clsx from "clsx";
import "./index.scss";

type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: string[];
};

export const Breadcrumb = ({
  items,
  className = "u-mb-40",
  id = "breadcrumb-list",
  ...rest
}: BreadcrumbProps) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" {...rest}>
      <ol
        id={id}
        className={clsx("breadcrumb__list", className)}
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
