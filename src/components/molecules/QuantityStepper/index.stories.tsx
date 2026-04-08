import type { Meta, StoryObj } from "@storybook/react";
import { QuantityStepper } from "./index";

const meta = {
  title: "Molecules/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    min: 1,
  },
};

export const MaxReached: Story = {
  args: {
    value: 5,
    min: 1,
    max: 5,
  },
};

export const Disabled: Story = {
  args: {
    value: 1,
    disabled: true,
  },
};
