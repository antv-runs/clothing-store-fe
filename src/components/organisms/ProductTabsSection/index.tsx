import { useState, useRef } from "react";
import type { HTMLAttributes } from "react";
import clsx from "clsx";

import type { ListErrorKind } from "@/types/listState";
import type { Review, ReviewSort } from "@/types/review";
import type { ProductFaq } from "@/types/product";

import { ProductTabsNav } from "@/components/molecules/ProductTabsNav";
import { ProductReviewsTab } from "@/components/organisms/ProductReviewsTab";
import { BREAKPOINTS } from "@/const/breakpoints";

import "./index.scss";

type TabKey = "tc-details" | "tc-reviews" | "tc-faqs";

type ProductTabsSectionProps = HTMLAttributes<HTMLDivElement> & {
  details: string;
  faqs: ProductFaq[];
  reviews: Review[];
  reviewCount: number;
  isLoadingReviews: boolean;
  isLoadingMoreReviews: boolean;
  isRetrying: boolean;
  hasMoreReviews: boolean;
  selectedRating: string;
  selectedSort: ReviewSort;
  onRatingChange: (value: string) => void;
  onSortChange: (value: ReviewSort) => void;
  onLoadMore: () => void;
  onRetry: () => void;
  reviewError?: string | null;
  reviewErrorKind?: ListErrorKind | null;
  onWriteReview: () => void;
};

const DEFAULT_ACTIVE_TAB: TabKey = "tc-reviews";

export const ProductTabsSection = ({
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
  reviewErrorKind,
  onWriteReview,
  className,
  ...rest
}: ProductTabsSectionProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>(DEFAULT_ACTIVE_TAB);
  const panelRefs = useRef<Map<TabKey, HTMLElement>>(new Map());

  const handleTabSelect = (tab: TabKey) => {
    setActiveTab(tab);

    if (window.innerWidth <= BREAKPOINTS.MD) {
      const target = panelRefs.current.get(tab);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={clsx("products-tabs", className)} {...rest}>
      <ProductTabsNav activeTab={activeTab} onTabSelect={handleTabSelect} />

      <div
        id="tc-details"
        ref={(el) => {
          if (el) panelRefs.current.set("tc-details", el);
        }}
        data-tab-content="tc-details"
        role="tabpanel"
        aria-labelledby="tab-tc-details"
        aria-hidden={activeTab !== "tc-details"}
        className={clsx("products-tabs__content", {
          "products-tabs__content--active": activeTab === "tc-details",
        })}
      >
        <div>{details}</div>
      </div>

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
        errorKind={reviewErrorKind}
        onWriteReview={onWriteReview}
      />

      <div
        id="tc-faqs"
        ref={(el) => {
          if (el) panelRefs.current.set("tc-faqs", el);
        }}
        data-tab-content="tc-faqs"
        role="tabpanel"
        aria-labelledby="tab-tc-faqs"
        aria-hidden={activeTab !== "tc-faqs"}
        className={clsx("products-tabs__content", {
          "products-tabs__content--active": activeTab === "tc-faqs",
        })}
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
      </div>
    </div>
  );
};
