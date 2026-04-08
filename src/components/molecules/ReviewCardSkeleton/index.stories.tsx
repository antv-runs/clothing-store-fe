import type { Meta, StoryObj } from "@storybook/react";
import { ReviewCardSkeleton } from "./index";

const meta = {
  title: "Molecules/ReviewCardSkeleton",
  component: ReviewCardSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
