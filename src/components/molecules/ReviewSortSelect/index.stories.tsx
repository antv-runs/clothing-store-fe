import type { Meta, StoryObj } from "@storybook/react";
import { ReviewSortSelect } from "./index";

const meta = {
  title: "Molecules/ReviewSortSelect",
  component: ReviewSortSelect,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "select",
      options: ["latest", "oldest", "highest"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ReviewSortSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "latest",
    options: [
      { value: "latest", label: "Latest" },
      { value: "oldest", label: "Oldest" },
      { value: "highest", label: "Highest Rating" },
    ],
    onChange: (val) => console.log("Selected sort:", val),
  },
};

export const Disabled: Story = {
  args: {
    value: "latest",
    options: [
      { value: "latest", label: "Latest" },
      { value: "oldest", label: "Oldest" },
    ],
    onChange: (val) => console.log("Selected sort:", val),
    disabled: true,
  },
};
