import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./index";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div"],
    },
    lineClamp: { control: "number" },
    hidden: { control: "boolean" },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is some standard text.",
  },
};

export const Span: Story = {
  args: {
    as: "span",
    children: "This text is rendered as a span element.",
  },
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    children: "This is a very long text block that should be clamped to a maximum of two lines. ".repeat(10),
  },
};
