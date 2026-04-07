import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./index";

const meta = {
  title: "Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    rating: { control: "number" },
  },
} satisfies Meta<typeof Rating>;

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

export const LowScore: Story = {
  args: {
    rating: 1.2,
  },
};
