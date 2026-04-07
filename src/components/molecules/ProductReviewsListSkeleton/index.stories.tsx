import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsListSkeleton } from "./index";

const meta = {
  title: "Molecules/ProductReviewsListSkeleton",
  component: ProductReviewsListSkeleton,
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
  },
} satisfies Meta<typeof ProductReviewsListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 3,
  },
};
