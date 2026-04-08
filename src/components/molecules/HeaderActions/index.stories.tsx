import type { Meta, StoryObj } from "@storybook/react";
import { HeaderActions } from "./index";

const meta = {
  title: "Molecules/HeaderActions",
  component: HeaderActions,
  tags: ["autodocs"],
  argTypes: {
    totalQuantity: { control: "number" },
  },
} satisfies Meta<typeof HeaderActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalQuantity: 0,
  },
};

export const WithItemsInCart: Story = {
  args: {
    totalQuantity: 5,
  },
};
