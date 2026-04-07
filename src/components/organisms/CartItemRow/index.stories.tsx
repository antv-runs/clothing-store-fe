import type { Meta, StoryObj } from "@storybook/react";
import { CartItemRow } from "./index";

const meta = {
  title: "Organisms/CartItemRow",
  component: CartItemRow,
  tags: ["autodocs"],
  argTypes: {
    isLocked: { control: "boolean" },
  },
} satisfies Meta<typeof CartItemRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formatPrice: (amount, currency) => `${currency === "USD" ? "$" : ""}${amount.toFixed(2)}`,
    item: {
      id: "prod-1",
      name: "Classic T-Shirt",
      description: "A very nice t-shirt.",
      thumbnail: "https://via.placeholder.com/120x120",
      rating: 4.5,
      ratingCount: 15,
      reviewCount: 3,
      categories: ["men"],
      pricing: {
        current: 25,
        original: 30,
        currency: "USD",
        discountPercent: 15,
      },
      stockStatus: "in-stock",
      colors: [],
      sizes: [],
      specs: [],
      images: [],
      quantity: 2,
      color: "Red",
      size: "M",
    },
  },
};

export const Locked: Story = {
  args: {
    isLocked: true,
    formatPrice: (amount, currency) => `$${amount.toFixed(2)}`,
    item: {
      id: "prod-2",
      name: "Locked T-Shirt",
      description: "You cannot change this item.",
      thumbnail: "https://via.placeholder.com/120x120",
      rating: 5,
      ratingCount: 10,
      reviewCount: 5,
      categories: ["men"],
      pricing: {
        current: 50,
        currency: "USD",
      },
      stockStatus: "in-stock",
      colors: [],
      sizes: [],
      specs: [],
      images: [],
      quantity: 1,
      color: null,
      size: null,
    },
  },
};
