import type { ReviewSort } from "@/types/review";
import clsx from "clsx";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import "./index.scss";

type ReviewSortOption = {
  value: string;
  label: string;
};

type ReviewSortSelectProps = {
  value: ReviewSort;
  options: ReviewSortOption[];
  onChange: (value: ReviewSort) => void;
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
  id = "review-sort",
}: ReviewSortSelectProps) => {
  const currentOption = options.find((opt) => opt.value === value);

  return (
    <DropdownMenu
      id={id}
      value={value}
      options={options}
      onChange={onChange}
      disabled={disabled}
      className={clsx("reviews__sort-container", className)}
      dropdownClassName={(isOpen) =>
        clsx("reviews__sort-dropdown", {
          "reviews__sort-dropdown--show": isOpen,
        })
      }
      trigger={({ isOpen, ref, toggle, onKeyDown }) => (
        <button
          id={id}
          ref={ref}
          type="button"
          className={clsx("reviews__sort-trigger", {
            "reviews__sort-trigger--active": isOpen,
          })}
          onClick={toggle}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={`${id}-menu`}
        >
          <span className="reviews__sort-label">
            {currentOption ? currentOption.label : "Sort by"}
          </span>
        </button>
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
          className={clsx("reviews__sort-option", {
            "reviews__sort-option--active": isActive,
          })}
          role="menuitemradio"
          aria-checked={isActive}
          onClick={onClick}
          onKeyDown={onKeyDown}
          tabIndex={tabIndex}
        >
          {option.label}
        </button>
      )}
    />
  );
};


export type { ReviewSortOption, ReviewSortSelectProps };
