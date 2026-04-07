import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethods } from "./index";

const meta = {
  title: "Molecules/PaymentMethods",
  component: PaymentMethods,
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethods>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { src: "https://via.placeholder.com/40x25", alt: "Visa" },
      { src: "https://via.placeholder.com/40x25", alt: "Mastercard" },
      { src: "https://via.placeholder.com/40x25", alt: "PayPal" },
    ],
  },
};
