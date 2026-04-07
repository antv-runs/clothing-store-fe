import type { Meta, StoryObj } from "@storybook/react";
import { ProductInfo } from "./index";

const meta = {
  title: "Organisms/ProductInfo",
  component: ProductInfo,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: "prod-1",
      name: "One Life Graphic T-shirt",
      description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      rating: 4.5,
      ratingCount: 15,
      reviewCount: 3,
      categories: ["men", "t-shirts"],
      pricing: {
        current: 260,
        original: 300,
        discountPercent: 20,
        currency: "USD",
      },
      stockStatus: "in-stock",
      colors: [],
      sizes: [],
      specs: [],
    },
  },
};
