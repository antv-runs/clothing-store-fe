import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "./index";

const meta = {
  title: "Atoms/Price",
  component: Price,
  tags: ["autodocs"],
  argTypes: {
    amount: { control: "number" },
    currency: { control: "text" },
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 199.99,
  },
};

export const CustomCurrency: Story = {
  args: {
    amount: 50,
    currency: "EUR",
  },
};
