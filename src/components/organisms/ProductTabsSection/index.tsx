import React, { useMemo, useState } from "react";
import "./index.scss";
import type { Review } from "@/types/review";
import type { ProductFaq } from "@/types/product";
import { ProductTabsNav } from "@/components/molecules/ProductTabsNav";
import { ProductReviewsTab } from "@/components/organisms/ProductReviewsTab";

type TabKey = "tc-details" | "tc-reviews" | "tc-faqs";

interface ProductTabsSectionProps {
  details: string;
  faqs: ProductFaq[];
  reviews: Review[];
  reviewCount: number;
  isLoadingReviews: boolean;
  isLoadingMoreReviews: boolean;
  hasMoreReviews: boolean;
  selectedRating: string;
  selectedSort: string;
  onRatingChange: (value: string) => void;
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  onLoadMore: () => void;
  reviewError?: string | null;
}

const DEFAULT_ACTIVE_TAB: TabKey = "tc-reviews";

/**
 * ProductTabsSection - Product details/reviews/faqs tabs content.
 * Preserves current tab markup and classes.
 */
export const ProductTabsSection: React.FC<ProductTabsSectionProps> = ({
  details,
  faqs,
  reviews,
  reviewCount,
  isLoadingReviews,
  isLoadingMoreReviews,
  hasMoreReviews,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  onLoadMore,
  reviewError,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_ACTIVE_TAB);

  const handleTabSelect = (tab: TabKey) => {
    setActiveTab(tab);

    if (window.innerWidth <= 768) {
      const target = document.getElementById(tab);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const detailsPanelClassName = useMemo(
    () =>
      `products-tabs__content js-products-tabs__content${
        activeTab === "tc-details" ? " products-tabs__content--active" : ""
      }`,
    [activeTab],
  );

  const faqsPanelClassName = useMemo(
    () =>
      `products-tabs__content js-products-tabs__content${
        activeTab === "tc-faqs" ? " products-tabs__content--active" : ""
      }`,
    [activeTab],
  );

  return (
    <section className="products-tabs js-products-tabs">
      <ProductTabsNav activeTab={activeTab} onTabSelect={handleTabSelect} />

      <section
        id="tc-details"
        data-tab-content="tc-details"
        role="tabpanel"
        aria-labelledby="tab-tc-details"
        aria-hidden={activeTab !== "tc-details"}
        className={detailsPanelClassName}
      >
        <div
          id="product-details-content"
          className="js-product-details-content"
        >
          {details}
        </div>
      </section>

      <ProductReviewsTab
        reviews={reviews}
        reviewCount={reviewCount}
        isActive={activeTab === "tc-reviews"}
        isLoading={isLoadingReviews}
        isLoadingMore={isLoadingMoreReviews}
        hasMore={hasMoreReviews}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onRatingChange={onRatingChange}
        onSortChange={onSortChange}
        onLoadMore={onLoadMore}
        error={reviewError}
      />

      <section
        id="tc-faqs"
        data-tab-content="tc-faqs"
        role="tabpanel"
        aria-labelledby="tab-tc-faqs"
        aria-hidden={activeTab !== "tc-faqs"}
        className={faqsPanelClassName}
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
