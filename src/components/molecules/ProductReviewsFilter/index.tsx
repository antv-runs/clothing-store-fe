import React from "react";
import "./index.scss";
import {
  ReviewSortSelect,
  type ReviewSortOption,
} from "@/components/molecules/ReviewSortSelect";
import { IconButton } from "@/components/atoms/IconButton";

interface ReviewFilterOption {
  label: string;
  value: string;
}

const REVIEW_FILTER_OPTIONS: ReviewFilterOption[] = [
  { label: "All Reviews", value: "All" },
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

export interface ProductReviewsFilterProps {
  selectedRating: string;
  onRatingChange: (value: string) => void;
  selectedSort: "latest" | "oldest" | "highest";
  onSortChange: (value: "latest" | "oldest" | "highest") => void;
  isDisabled?: boolean;
}

/**
 * ProductReviewsFilter - Review filter dropdown and sort controls.
 */
export const ProductReviewsFilter: React.FC<ProductReviewsFilterProps> = ({
  selectedRating,
  onRatingChange,
  selectedSort,
  onSortChange,
  isDisabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const filterRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  const handleFilterToggle = () => {
    if (isDisabled) {
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectRating = (value: string) => {
    onRatingChange(value);
    setIsOpen(false);
  };

  return (
    <div className="reviews__actions" ref={filterRef}>
      <div className="reviews__filter">
        <IconButton
          id="btn-filter-by-stars"
          className="reviews__action reviews__action--filter js-btn-filter-by-stars"
          svgName="icn_filter"
          ariaLabel="Filter reviews by star rating"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-filter-by-stars"
          onClick={handleFilterToggle}
          disabled={isDisabled}
          variant="circular"
          iconWidth={20.25}
          iconHeight={18.75}
        />

        <div
          id="dropdown-filter-by-stars"
          className={`reviews__filter-dropdown js-dropdown-filter-by-stars${
            isOpen ? " reviews__filter-dropdown--show" : ""
          }`}
          role="listbox"
          aria-labelledby="btn-filter-by-stars"
          tabIndex={-1}
        >
          {REVIEW_FILTER_OPTIONS.map((option) => {
            const isActive = option.value === selectedRating;
            return (
              <button
                key={option.value}
                type="button"
                className={`reviews__filter-option js-reviews__filter-option${
                  isActive ? " reviews__filter-option--active" : ""
                }`}
                data-stars={option.value}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelectRating(option.value)}
                disabled={isDisabled}
              >
                <span className="reviews__filter-stars">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ReviewSortSelect
        id="reviews-sort-select"
        className="reviews__action reviews__action--sort js-reviews-sort-select"
        value={selectedSort}
        options={REVIEW_SORT_OPTIONS}
        onChange={onSortChange}
        ariaLabel="Sort reviews"
      />

      <button
        type="button"
        className="reviews__action reviews__action--write js-write-review-button"
        aria-label="Write a review"
        disabled={isDisabled}
      >
        Write a Review
      </button>
    </div>
  );
};
