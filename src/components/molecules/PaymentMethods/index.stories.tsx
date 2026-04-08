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
    items: [{
      "src": "/images/icn_visa.svg",
      "alt": "Visa"
    }, {
      "src": "/images/icn_mastercard.svg",
      "alt": "Mastercard"
    }, {
      "src": "/images/icn_paypal.svg",
      "alt": "PayPal"
    }],

    className: ""
  },
};
