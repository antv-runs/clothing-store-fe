import type { Meta, StoryObj } from "@storybook/react";
import { ReviewCard } from "./index";

const meta = {
  title: "Molecules/ReviewCard",
  component: ReviewCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    review: {
      id: "rev-1",
      productId: "prod-1",
      name: "Alex Smith",
      ratingStar: 4,
      desc: "Good fit, but a little long on the sleeves.",
      isVerified: true,
      createdAt: "2023-11-05T14:48:00.000Z",
    },
  },
};
