import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { CartSummaryPanel } from "./index";

const meta = {
  title: "Organisms/CartSummaryPanel",
  component: CartSummaryPanel,
  tags: ["autodocs"],
  argTypes: {
    isCheckoutDisabled: { control: "boolean" },
    isLocked: { control: "boolean" },
  },
} satisfies Meta<typeof CartSummaryPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formatPrice: (amount) => `$${amount.toFixed(2)}`,
    isCheckoutDisabled: false,
    summary: {
      subtotal: 100,
      discount: 20,
      discountPercent: 20,
      delivery: 15,
      total: 95,
    },
    onCheckout: () => logger.log("checkout"),
  },
};

export const DisabledCheckout: Story = {
  args: {
    formatPrice: (amount) => `$${amount.toFixed(2)}`,
    isCheckoutDisabled: true,
    summary: {
      subtotal: 0,
      discount: 0,
      discountPercent: 0,
      delivery: 0,
      total: 0,
    },
  },
};
