import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./index";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    svgName: { control: "text" },
    color: { control: "color" },
    size: { control: "text" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    svgName: "cart",
    size: 24,
  },
};

export const Colored: Story = {
  args: {
    svgName: "cart",
    size: 32,
    color: "red",
  },
};
