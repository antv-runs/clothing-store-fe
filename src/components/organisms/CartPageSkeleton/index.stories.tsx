import type { Meta, StoryObj } from "@storybook/react";
import { CartPageSkeleton } from "./index";

const meta = {
  title: "Organisms/CartPageSkeleton",
  component: CartPageSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof CartPageSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
