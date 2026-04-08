import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutPageSkeleton } from "./index";

const meta = {
  title: "Organisms/CheckoutPageSkeleton",
  component: CheckoutPageSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutPageSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
