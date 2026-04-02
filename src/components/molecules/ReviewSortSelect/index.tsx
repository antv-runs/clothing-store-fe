import React from "react";
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
  disabled?: boolean;
  id?: string;
};

export const ReviewSortSelect = ({
  value,
  options,
  onChange,
  ariaLabel = "Sort reviews",
  className,
  disabled = false,
  id,
}: ReviewSortSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as AllowedReviewSort;
    onChange(value);
  };

  return (
    <div className={className}>
      <select
        id={id}
        className="reviews__select"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export type { ReviewSortOption, ReviewSortSelectProps };
