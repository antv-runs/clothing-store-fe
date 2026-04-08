import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailSkeleton } from "./index";

const meta = {
  title: "Organisms/ProductDetailSkeleton",
  component: ProductDetailSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
