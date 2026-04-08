import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    unstyled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter value here...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled value",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot type here...",
    disabled: true,
  },
};

export const Unstyled: Story = {
  args: {
    placeholder: "Raw input...",
    unstyled: true,
  },
};
