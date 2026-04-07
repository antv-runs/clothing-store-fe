import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutItemRow } from "./index";

const meta = {
  title: "Organisms/CheckoutItemRow",
  component: CheckoutItemRow,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutItemRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formatPrice: (amount, currency) => `${currency === "USD" ? "$" : ""}${amount.toFixed(2)}`,
    item: {
      id: "prod-3",
      name: "Checkout Item",
      description: "Item description goes here.",
      thumbnail: "https://via.placeholder.com/120x120",
      rating: 4.8,
      ratingCount: 20,
      reviewCount: 4,
      categories: ["women"],
      pricing: {
        current: 40,
        currency: "USD",
      },
      stockStatus: "in-stock",
      colors: [],
      sizes: [],
      specs: [],
      images: [],
      quantity: 3,
      color: "Blue",
      size: "L",
    },
  },
};
