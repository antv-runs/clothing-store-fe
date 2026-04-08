import type { Meta, StoryObj } from "@storybook/react";
import { ProductPrice } from "./index";

const meta = {
  title: "Molecules/ProductPrice",
  component: ProductPrice,
  tags: ["autodocs"],
  argTypes: {
    currentAmount: { control: "number" },
    originalAmount: { control: "number" },
    discountPercent: { control: "number" },
    currency: { control: "text" },
  },
} satisfies Meta<typeof ProductPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentAmount: 120,
    currency: "USD",
  },
};

export const OnSale: Story = {
  args: {
    currentAmount: 90,
    originalAmount: 120,
    discountPercent: 25,
    currency: "USD",
  },
};

export const LegacyMode: Story = {
  args: {
    pricing: {
      current: 45,
      original: 60,
      currency: "USD",
      discountPercent: 25,
    },
  },
};
