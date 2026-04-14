import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, type DropdownMenuOption } from "./index";
import { logger } from "@/utils/logger";
import clsx from "clsx";

/**
 * Headless DropdownMenu Story.
 * Demonstrates the headless logic by providing a sample UI implementation.
 */
const meta = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS: DropdownMenuOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <div style={{ padding: "50px", minHeight: "200px" }}>
        <DropdownMenu
          id="sample-menu"
          value={value}
          options={OPTIONS}
          onChange={(val) => {
            setValue(val);
            logger.log("Selected:", val);
          }}
          className="sample-container"
          dropdownClassName={(isOpen) =>
            clsx("sample-dropdown", { "sample-dropdown--show": isOpen })
          }
          trigger={({ isOpen, ref, toggle, onKeyDown }) => (
            <button
              ref={ref}
              type="button"
              onClick={toggle}
              onKeyDown={onKeyDown}
              style={{
                background: "#f0f0f0",
                border: "1px solid #ccc",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {OPTIONS.find((o) => o.value === value)?.label || "Select..."}
              <span style={{ marginLeft: "8px" }}>{isOpen ? "▲" : "▼"}</span>
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
              onClick={onClick}
              onKeyDown={onKeyDown}
              tabIndex={tabIndex}
              style={{
                width: "100%",
                background: isActive ? "#e0e0e0" : "white",
                border: "none",
                padding: "8px 16px",
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {option.label}
            </button>
          )}
        />

        <style>
          {`
            .sample-dropdown {
              background: white;
              border: 1px solid #ccc;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              margin-top: 4px;
              min-width: 150px;
            }
            .sample-dropdown--show {
              display: block;
            }
          `}
        </style>
      </div>
    );
  },
};
