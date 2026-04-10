import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsHeader } from "./index";

const meta = {
  title: "Molecules/ProductReviewsHeader",
  component: ProductReviewsHeader,
  tags: ["autodocs"],
  argTypes: {
    reviewCount: { control: "number" },
    selectedRating: { control: "text" },
    selectedSort: {
      control: "select",
      options: ["latest", "oldest", "highest"],
    },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof ProductReviewsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reviewCount: 42,
    selectedRating: "All",
    selectedSort: "latest",
    onRatingChange: (val) => logger.log("rating", val),
    onSortChange: (val) => logger.log("sort", val),
    onWriteReview: () => logger.log("write"),
  },
};

export const Loading: Story = {
  args: {
    reviewCount: 42,
    selectedRating: "All",
    selectedSort: "latest",
    isLoading: true,
    onRatingChange: (val) => logger.log("rating", val),
    onSortChange: (val) => logger.log("sort", val),
    onWriteReview: () => logger.log("write"),
  },
};
