import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import "./index.scss";

export type DropdownMenuOption = {
  value: string;
  [key: string]: any;
};

type DropdownMenuProps<T extends string> = {
  id: string;
  value: T;
  options: DropdownMenuOption[];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string | ((isOpen: boolean) => string);
  trigger: (props: {
    isOpen: boolean;
    ref: React.RefObject<HTMLButtonElement | null>;
    toggle: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }) => React.ReactNode;
  renderOption: (props: {
    option: DropdownMenuOption;
    isActive: boolean;
    ref: (el: HTMLButtonElement | null) => void;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    tabIndex: number;
    isOpen: boolean;
  }) => React.ReactNode;
};

/**
 * DropdownMenu - A headless, logic-first menu component.
 * Handles state, click-outside, and keyboard accessibility.
 */
export const DropdownMenuComponent = <T extends string>({
  id,
  value,
  options,
  onChange,
  disabled = false,
  className,
  dropdownClassName,
  trigger,
  renderOption,
}: DropdownMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Click outside functionality
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue as T);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        setIsOpen(true);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        {
          const nextIndex = (index + 1) % options.length;
          itemRefs.current[nextIndex]?.focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        {
          const prevIndex = (index - 1 + options.length) % options.length;
          itemRefs.current[prevIndex]?.focus();
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Focus management: move focus to active item when opening
  useEffect(() => {
    if (isOpen) {
      const activeIndex = options.findIndex((opt) => opt.value === value);
      const focusIndex = activeIndex >= 0 ? activeIndex : 0;
      const timer = setTimeout(() => {
        itemRefs.current[focusIndex]?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, value, options]);

  const resolvedDropdownClassName =
    typeof dropdownClassName === "function"
      ? dropdownClassName(isOpen)
      : dropdownClassName;

  return (
    <div
      className={clsx("dropdown-menu", className)}
      ref={containerRef}
    >
      {trigger({
        isOpen,
        ref: triggerRef,
        toggle: handleToggle,
        onKeyDown: handleTriggerKeyDown,
      })}

      <ul
        id={`${id}-menu`}
        className={clsx("dropdown-menu__list", {
          "dropdown-menu__list--show": isOpen,
        }, resolvedDropdownClassName)}
        role="menu"
        aria-labelledby={id}
      >
        {options.map((option, index) => {
          const isActive = option.value === value;
          return (
            <li key={option.value} role="none" className="dropdown-menu__item-container">
              {renderOption({
                option,
                isActive,
                ref: (el) => (itemRefs.current[index] = el),
                onClick: () => handleSelect(option.value),
                onKeyDown: (e) => handleItemKeyDown(e, index),
                tabIndex: isOpen ? 0 : -1,
                isOpen,
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const DropdownMenu = React.memo(DropdownMenuComponent) as typeof DropdownMenuComponent;

