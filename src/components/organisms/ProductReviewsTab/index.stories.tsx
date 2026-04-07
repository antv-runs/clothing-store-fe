import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsTab } from "./index";

const meta = {
  title: "Organisms/ProductReviewsTab",
  component: ProductReviewsTab,
  tags: ["autodocs"],
  argTypes: {
    isActive: { control: "boolean" },
    isLoading: { control: "boolean" },
    selectedSort: {
      control: "select",
      options: ["latest", "oldest", "highest"],
    },
  },
} satisfies Meta<typeof ProductReviewsTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: true,
    isLoading: false,
    isLoadingMore: false,
    isRetrying: false,
    hasMore: true,
    reviewCount: 5,
    selectedRating: "All",
    selectedSort: "latest",
    reviews: [
      {
        id: "1",
        productId: "p1",
        name: "Jane Doe",
        ratingStar: 5,
        desc: "Great product!",
        isVerified: true,
        createdAt: "2023-01-01T12:00:00Z",
      },
    ],
    onRatingChange: (val) => console.log("rating", val),
    onSortChange: (val) => console.log("sort", val),
    onLoadMore: () => console.log("load more"),
    onRetry: () => console.log("retry"),
    onWriteReview: () => console.log("write review"),
  },
};
