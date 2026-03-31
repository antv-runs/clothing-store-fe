import React from "react";
import { IconButton } from "@/components/atoms/IconButton";
import {
  ReviewSortSelect,
  type ReviewSortOption,
} from "@/components/molecules/ReviewSortSelect";

interface ReviewFilterOption {
  label: string;
  value: string;
  isDefault?: boolean;
}

const REVIEW_FILTER_OPTIONS: ReviewFilterOption[] = [
  { label: "All Reviews", value: "All", isDefault: true },
  { label: "5 stars", value: "5" },
  { label: "4.5 stars", value: "4.5" },
  { label: "4 stars", value: "4" },
  { label: "3.5 stars", value: "3.5" },
  { label: "3 stars", value: "3" },
  { label: "2.5 stars", value: "2.5" },
  { label: "2 stars", value: "2" },
  { label: "1.5 stars", value: "1.5" },
  { label: "1 star", value: "1" },
];

const REVIEW_SORT_OPTIONS: ReviewSortOption[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest Rating" },
];

/**
 * ProductReviewsFilter - Review filter dropdown and sort controls.
 */
export const ProductReviewsFilter: React.FC = () => {
  const [sortValue, setSortValue] = React.useState<string>("latest");

  return (
    <div className="reviews__actions">
      <div className="reviews__filter">
        <IconButton
          svgName="icn_filter"
          id="btn-filter-by-stars"
          className="reviews__action reviews__action--filter js-btn-filter-by-stars"
          ariaLabel="Filter reviews by star rating"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-controls="dropdown-filter-by-stars"
          iconWidth={22}
          iconHeight={22}
        />

        <div
          id="dropdown-filter-by-stars"
          className="reviews__filter-dropdown js-dropdown-filter-by-stars"
          role="listbox"
          aria-labelledby="btn-filter-by-stars"
          tabIndex={-1}
        >
          {REVIEW_FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`reviews__filter-option js-reviews__filter-option${option.isDefault ? " reviews__filter-option--active" : ""}`}
              data-stars={option.value}
              role="option"
              aria-selected={option.isDefault ? "true" : "false"}
            >
              <span className="reviews__filter-stars">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <ReviewSortSelect
        id="reviews-sort-select"
        className="reviews__action reviews__action--sort js-reviews-sort-select"
        value={sortValue}
        options={REVIEW_SORT_OPTIONS}
        onChange={setSortValue}
        ariaLabel="Sort reviews"
      />

      <button
        type="button"
        className="reviews__action reviews__action--write js-write-review-button"
        aria-label="Write a review"
      >
        Write a Review
      </button>
    </div>
  );
};
