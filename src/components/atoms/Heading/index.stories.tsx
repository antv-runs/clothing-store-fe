import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./index";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    title: { control: "text" },
    noOfLines: { control: "number" },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: "h1",
    children: "This is a Heading",
  },
};

export const ClampLines: Story = {
  args: {
    as: "h2",
    noOfLines: 1,
    children: "This is a very long heading that should be clamped to one line. This text continues so we can see the clamping effect.",
  },
};
