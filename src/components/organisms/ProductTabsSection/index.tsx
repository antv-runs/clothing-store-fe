import React, { useMemo, useState, useRef } from "react";
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
  isRetrying: boolean;
  hasMoreReviews: boolean;
  selectedRating: string;
  selectedSort: "latest" | "oldest" | "highest";
  onRatingChange: (value: string) => void;
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  onLoadMore: () => void;
  onRetry: () => void;
  reviewError?: string | null;
  onWriteReview: () => void;
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
  isRetrying,
  hasMoreReviews,
  selectedRating,
  selectedSort,
  onRatingChange,
  onSortChange,
  onLoadMore,
  onRetry,
  reviewError,
  onWriteReview,
}) => {

  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_ACTIVE_TAB);

  const panelRefs = useRef<Map<TabKey, HTMLElement>>(new Map());

  const handleTabSelect = (tab: TabKey) => {
    setActiveTab(tab);

    if (window.innerWidth <= 768) {
      const target = panelRefs.current.get(tab);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const detailsPanelClassName = useMemo(
    () =>
      `products-tabs__content${activeTab === "tc-details" ? " products-tabs__content--active" : ""}`,
    [activeTab],
  );

  const faqsPanelClassName = useMemo(
    () =>
      `products-tabs__content${activeTab === "tc-faqs" ? " products-tabs__content--active" : ""}`,
    [activeTab],
  );

  return (
    <section className="products-tabs">
      <ProductTabsNav activeTab={activeTab} onTabSelect={handleTabSelect} />

      <section
        id="tc-details"
        ref={(el) => {
          if (el) panelRefs.current.set("tc-details", el);
        }}
        data-tab-content="tc-details"
        role="tabpanel"
        aria-labelledby="tab-tc-details"
        aria-hidden={activeTab !== "tc-details"}
        className={detailsPanelClassName}
      >
        <div>
          {details}
        </div>
      </section>

      <ProductReviewsTab
        panelRef={(el: HTMLElement | null) => {
          if (el) panelRefs.current.set("tc-reviews", el);
        }}
        reviews={reviews}
        reviewCount={reviewCount}
        isActive={activeTab === "tc-reviews"}
        isLoading={isLoadingReviews}
        isLoadingMore={isLoadingMoreReviews}
        isRetrying={isRetrying}
        hasMore={hasMoreReviews}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onRatingChange={onRatingChange}
        onSortChange={onSortChange}
        onLoadMore={onLoadMore}
        onRetry={onRetry}
        error={reviewError}
        onWriteReview={onWriteReview}
      />

      <section
        id="tc-faqs"
        ref={(el) => {
          if (el) panelRefs.current.set("tc-faqs", el);
        }}
        data-tab-content="tc-faqs"
        role="tabpanel"
        aria-labelledby="tab-tc-faqs"
        aria-hidden={activeTab !== "tc-faqs"}
        className={faqsPanelClassName}
      >
        <ul className="faqs">
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
