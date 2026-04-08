import type { Meta, StoryObj } from "@storybook/react";
import { ProductTabsSection } from "./index";

const meta = {
  title: "Organisms/ProductTabsSection",
  component: ProductTabsSection,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductTabsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    details: "These are the product details...",
    faqs: [
      {
        question: "Is it machine washable?",
        answer: "Yes, wash with cold water.",
      },
    ],
    reviews: [
      {
        id: "1",
        productId: "p1",
        name: "Test User",
        ratingStar: 4,
        desc: "Good.",
        isVerified: true,
        createdAt: "2023-11-15T12:00:00Z",
      },
    ],
    reviewCount: 1,
    isLoadingReviews: false,
    isLoadingMoreReviews: false,
    isRetrying: false,
    hasMoreReviews: false,
    selectedRating: "All",
    selectedSort: "latest",
    onRatingChange: (val) => console.log("rating", val),
    onSortChange: (val) => console.log("sort", val),
    onLoadMore: () => console.log("load more"),
    onRetry: () => console.log("retry"),
    onWriteReview: () => console.log("write review"),
  },
};
