import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./index";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ghost", "circular"],
    },
    disabled: { control: "boolean" },
    color: { control: "color" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    svgName: "cart",
    ariaLabel: "Cart",
    variant: "default",
  },
};

export const Ghost: Story = {
  args: {
    svgName: "cart",
    ariaLabel: "Cart",
    variant: "ghost",
  },
};

export const Circular: Story = {
  args: {
    svgName: "cart",
    ariaLabel: "Cart",
    variant: "circular",
  },
};

export const Disabled: Story = {
  args: {
    svgName: "cart",
    ariaLabel: "Cart",
    disabled: true,
  },
};
