import React from "react";
import "./ProductTabsSection.scss";
import type { Review } from "@/types/review";
import type { ProductFaq } from "@/types/product";
import { ProductTabsNav } from "./ProductTabsNav.tsx";
import { ProductReviewsTab } from "./ProductReviewsTab.tsx";

interface ProductTabsSectionProps {
  details: string;
  faqs: ProductFaq[];
  reviews: Review[];
  reviewCount: number;
}

/**
 * ProductTabsSection - Product details/reviews/faqs tabs content.
 * Preserves current tab markup and classes.
 */
export const ProductTabsSection: React.FC<ProductTabsSectionProps> = ({
  details,
  faqs,
  reviews,
  reviewCount,
}) => {
  return (
    <section className="products-tabs js-products-tabs">
      <ProductTabsNav />

      <section
        id="tc-details"
        data-tab-content="tc-details"
        className="products-tabs__content js-products-tabs__content"
      >
        <div
          id="product-details-content"
          className="js-product-details-content"
        >
          {details}
        </div>
      </section>

      <ProductReviewsTab reviews={reviews} reviewCount={reviewCount} />

      <section
        id="tc-faqs"
        data-tab-content="tc-faqs"
        className="products-tabs__content js-products-tabs__content"
      >
        <ul id="product-faqs-list" className="faqs js-product-faqs-list">
          {faqs.length ? (
            faqs.map((faq, index) => (
              <li key={`${faq.question}-${index}`}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </li>
            ))
          ) : (
            <li>No FAQs available.</li>
          )}
        </ul>
      </section>
    </section>
  );
};
