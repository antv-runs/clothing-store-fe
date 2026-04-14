import { type HTMLAttributes } from "react";
import "./index.scss";
import {
  ReviewSortSelect,
  type ReviewSortOption,
} from "@/components/molecules/ReviewSortSelect";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import clsx from "clsx";
import type { ReviewSort } from "@/types/review";

type ReviewFilterOption = {
  label: string;
  value: string;
};

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

type ProductReviewsFilterProps = HTMLAttributes<HTMLDivElement> & {
  selectedRating: string;
  onRatingChange: (value: string) => void;
  selectedSort: ReviewSort;
  onSortChange: (value: ReviewSort) => void;
  isDisabled?: boolean;
  onWriteReview: () => void;
};

/**
 * ProductReviewsFilter - Review filter dropdown and sort controls.
 */
export const ProductReviewsFilter = ({
  selectedRating,
  onRatingChange,
  selectedSort,
  onSortChange,
  isDisabled = false,
  onWriteReview,
  className,
  ...rest
}: ProductReviewsFilterProps) => {
  return (
    <div className={clsx("reviews__actions", className)} {...rest}>
      <DropdownMenu
        id="btn-filter-by-stars"
        value={selectedRating}
        options={REVIEW_FILTER_OPTIONS}
        onChange={onRatingChange}
        disabled={isDisabled}
        className="reviews__filter"
        dropdownClassName={(isOpen) =>
          clsx("reviews__filter-dropdown", {
            "reviews__filter-dropdown--show": isOpen,
          })
        }
        trigger={({ isOpen, ref, toggle, onKeyDown }) => (
          <IconButton
            id="btn-filter-by-stars"
            ref={ref}
            className="reviews__action reviews__action--filter"
            svgName="icn_filter"
            ariaLabel="Filter reviews by star rating"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls="btn-filter-by-stars-menu"
            onClick={toggle}
            onKeyDown={onKeyDown}
            disabled={isDisabled}
            iconWidth={20.25}
            iconHeight={18.75}
          />
        )}
        renderOption={({
          option,
          isActive,
          ref,
          onClick,
          onKeyDown,
          tabIndex,
        }) => (
          <button
            ref={ref}
            type="button"
            className={clsx("reviews__filter-option", {
              "reviews__filter-option--active": isActive,
            })}
            data-stars={option.value}
            role="menuitemradio"
            aria-checked={isActive}
            onClick={onClick}
            onKeyDown={onKeyDown}
            disabled={isDisabled}
            tabIndex={tabIndex}
          >
            <span className="reviews__filter-stars">{option.label}</span>
          </button>
        )}
      />

      <ReviewSortSelect
        id="reviews-sort-select"
        className="reviews__action reviews__action--sort"
        value={selectedSort}
        options={REVIEW_SORT_OPTIONS}
        disabled={isDisabled}
        onChange={onSortChange}
        ariaLabel="Sort reviews"
      />

      <Button
        variant="primary"
        type="button"
        className="reviews__action reviews__action--write"
        aria-label="Write a review"
        disabled={isDisabled}
        onClick={onWriteReview}
      >
        Write a Review
      </Button>
    </div>
  );
};

