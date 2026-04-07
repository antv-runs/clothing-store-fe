import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutSummaryPanel } from "./index";

const meta = {
  title: "Organisms/CheckoutSummaryPanel",
  component: CheckoutSummaryPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutSummaryPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formatPrice: (amount) => `$${amount.toFixed(2)}`,
    summary: {
      subtotal: 120,
      discount: 10,
      discountPercent: 5,
      delivery: 5,
      total: 115,
    },
    items: [
      {
        id: "prod-1",
        name: "Item 1",
        description: "",
        thumbnail: "https://via.placeholder.com/64x64",
        rating: 5,
        ratingCount: 1,
        reviewCount: 0,
        categories: [],
        pricing: { current: 60, currency: "USD" },
        stockStatus: "in-stock",
        colors: [],
        sizes: [],
        specs: [],
        images: [],
        quantity: 1,
        color: null,
        size: null,
      },
      {
        id: "prod-2",
        name: "Item 2",
        description: "",
        thumbnail: "https://via.placeholder.com/64x64",
        rating: 4,
        ratingCount: 1,
        reviewCount: 0,
        categories: [],
        pricing: { current: 60, currency: "USD" },
        stockStatus: "in-stock",
        colors: [],
        sizes: [],
        specs: [],
        images: [],
        quantity: 1,
        color: null,
        size: null,
      },
    ],
  },
};
