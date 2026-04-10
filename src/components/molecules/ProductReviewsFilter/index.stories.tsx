import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsFilter } from "./index";

const meta = {
  title: "Molecules/ProductReviewsFilter",
  component: ProductReviewsFilter,
  tags: ["autodocs"],
  argTypes: {
    selectedRating: { control: "text" },
    selectedSort: {
      control: "select",
      options: ["latest", "oldest", "highest"],
    },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof ProductReviewsFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedRating: "All",
    selectedSort: "latest",
    onRatingChange: (val) => logger.log("rating change", val),
    onSortChange: (val) => logger.log("sort change", val),
    onWriteReview: () => logger.log("write review"),
  },
};

export const Disabled: Story = {
  args: {
    selectedRating: "4",
    selectedSort: "highest",
    isDisabled: true,
    onRatingChange: (val) => logger.log("rating change", val),
    onSortChange: (val) => logger.log("sort change", val),
    onWriteReview: () => logger.log("write review"),
  },
};
