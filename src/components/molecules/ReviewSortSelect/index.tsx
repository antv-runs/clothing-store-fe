import React from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import styles from "./ReviewSortSelect.module.scss";

type ReviewSortOption = {
  value: string;
  label: string;
};

type ReviewSortSelectProps = {
  value: string;
  options: ReviewSortOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  id?: string;
};

export function ReviewSortSelect({
  value,
  options,
  onChange,
  ariaLabel = "Sort reviews",
  className,
  id,
}: ReviewSortSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clsx(styles.reviewSortSelect, className)}>
      <select
        id={id}
        className={styles.select}
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
        className={styles.icon}
      />
    </div>
  );
}

export type { ReviewSortOption, ReviewSortSelectProps };
