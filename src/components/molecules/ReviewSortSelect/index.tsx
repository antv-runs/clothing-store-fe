import React from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import "./index.scss";

type ReviewSortOption = {
  value: string;
  label: string;
};

type AllowedReviewSort = "latest" | "oldest" | "highest";

type ReviewSortSelectProps = {
  value: AllowedReviewSort;
  options: ReviewSortOption[];
  onChange: (value: AllowedReviewSort) => void;
  ariaLabel?: string;
  className?: string;
  id?: string;
};

export const ReviewSortSelect = ({
  value,
  options,
  onChange,
  ariaLabel = "Sort reviews",
  className,
  id,
}: ReviewSortSelectProps) => {
const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value as AllowedReviewSort;
  onChange(value);
};

  return (
    <div className={clsx("review-sort-select", className)}>
      <select
        id={id}
        className="review-sort-select__select"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Icon
        svgName="icn_dropdown"
        width={14}
        height={14}
        color="#6f6f6f"
        className="review-sort-select__icon"
      />
    </div>
  );
};

export type { ReviewSortOption, ReviewSortSelectProps };
