import React from "react";
import "./ProductTabsNav.scss";

/**
 * ProductTabsNav organism fragment - Tabs navigation for product tabbed content.
 */
export const ProductTabsNav: React.FC = () => {
  return (
    <div className="tabs" aria-label="Product tabs">
      <button className="tabs__tab js-tabs__tab" data-tab="tc-details">
        Product Details
      </button>

      <button
        className="tabs__tab js-tabs__tab tabs__tab--active"
        data-tab="tc-reviews"
      >
        Rating &amp; Reviews
      </button>

      <button className="tabs__tab js-tabs__tab" data-tab="tc-faqs">
        FAQs
      </button>
    </div>
  );
};
