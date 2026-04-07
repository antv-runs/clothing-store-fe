import type { Meta, StoryObj } from "@storybook/react";
import { RatingDisplay } from "./index";

const meta = {
  title: "Molecules/RatingDisplay",
  component: RatingDisplay,
  tags: ["autodocs"],
  argTypes: {
    rating: { control: "number" },
    maxStars: { control: "number" },
    showEmpty: { control: "boolean" },
  },
} satisfies Meta<typeof RatingDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4.5,
  },
};

export const PerfectScore: Story = {
  args: {
    rating: 5,
  },
};

export const WithEmptyStars: Story = {
  args: {
    rating: 2.5,
    showEmpty: true,
  },
};
