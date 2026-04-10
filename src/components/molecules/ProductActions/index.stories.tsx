import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductActions } from "./index";

const meta = {
  title: "Molecules/ProductActions",
  component: ProductActions,
  tags: ["autodocs"],
  argTypes: {
    selectedColorId: { control: "text" },
    selectedSizeId: { control: "text" },
    quantity: { control: "number" },
  },
} satisfies Meta<typeof ProductActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quantity: 1,
    onDecreaseQuantity: () => logger.log("decrease"),
    onIncreaseQuantity: () => logger.log("increase"),
    onQuantityChange: (val) => logger.log("change", val),
    onAddToCart: () => logger.log("add to cart"),
  },
};

export const WithSelections: Story = {
  args: {
    quantity: 2,
    selectedColorId: "color-red",
    selectedSizeId: "size-m",
    onDecreaseQuantity: () => logger.log("decrease"),
    onIncreaseQuantity: () => logger.log("increase"),
    onQuantityChange: (val) => logger.log("change", val),
    onAddToCart: () => logger.log("add to cart"),
  },
};
