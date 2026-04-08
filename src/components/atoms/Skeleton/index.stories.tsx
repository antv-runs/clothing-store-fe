import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./index";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["rect", "circle", "line"],
    },
    width: { control: "text" },
    height: { control: "text" },
    radius: { control: "text" },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rect: Story = {
  args: {
    variant: "rect",
    width: 200,
    height: 100,
  },
};

export const Circle: Story = {
  args: {
    variant: "circle",
    width: 50,
    height: 50,
  },
};

export const Line: Story = {
  args: {
    variant: "line",
    width: "80%",
    height: 20,
  },
};
