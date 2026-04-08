import type { Meta, StoryObj } from "@storybook/react";
import { CartEmptyState } from "./index";

const meta = {
  title: "Molecules/CartEmptyState",
  component: CartEmptyState,
  tags: ["autodocs"],
  argTypes: {
    isVisible: { control: "boolean" },
  },
} satisfies Meta<typeof CartEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    isVisible: false,
  },
};
