import type { HTMLAttributes } from "react";
import "./index.scss";
import clsx from "clsx";

type TabKey = "tc-details" | "tc-reviews" | "tc-faqs";

type ProductTabsNavProps = HTMLAttributes<HTMLDivElement> & {
  activeTab: TabKey;
  onTabSelect: (tab: TabKey) => void;
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "tc-details", label: "Product Details" },
  { key: "tc-reviews", label: "Rating & Reviews" },
  { key: "tc-faqs", label: "FAQs" },
];

/**
 * ProductTabsNav organism fragment - Tabs navigation for product tabbed content.
 */
export const ProductTabsNav = ({
  activeTab,
  onTabSelect,
  className,
  ...rest
}: ProductTabsNavProps) => {
  return (
    <div className={clsx("tabs", className)} role="tablist" aria-label="Product tabs" {...rest}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            id={`tab-${tab.key}`}
            className={`tabs__tab${
              isActive ? " tabs__tab--active" : ""
            }`}
            role="tab"
            aria-selected={isActive}
            aria-controls={tab.key}
            tabIndex={isActive ? 0 : -1}
            data-tab={tab.key}
            onClick={() => onTabSelect(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
