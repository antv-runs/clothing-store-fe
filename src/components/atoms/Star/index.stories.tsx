import type { Meta, StoryObj } from "@storybook/react";
import { Star } from "./index";

const meta = {
  title: "Atoms/Star",
  component: Star,
  tags: ["autodocs"],
  argTypes: {
    rating: { control: "number" },
    maxStars: { control: "number" },
    showEmpty: { control: "boolean" },
    halfStarMode: {
      control: "select",
      options: ["path", "clip"],
    },
    size: { control: "number" },
  },
} satisfies Meta<typeof Star>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullStars: Story = {
  args: {
    rating: 5,
    maxStars: 5,
  },
};

export const HalfStar: Story = {
  args: {
    rating: 3.5,
    maxStars: 5,
  },
};

export const EmptyStars: Story = {
  args: {
    rating: 0,
    maxStars: 5,
  },
};

export const HideEmpty: Story = {
  args: {
    rating: 2.5,
    maxStars: 5,
    showEmpty: false,
  },
};
