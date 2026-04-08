import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsList } from "./index";

const meta = {
  title: "Molecules/ProductReviewsList",
  component: ProductReviewsList,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductReviewsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
      {
        id: "2",
        productId: "p1",
        name: "John Smith",
        ratingStar: 4,
        desc: "Very good, but shipping was slow.",
        isVerified: false,
        createdAt: "2023-02-01T12:00:00Z",
      },
    ],
  },
};
