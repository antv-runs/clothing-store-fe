import type { Meta, StoryObj } from "@storybook/react";
import { RetryState } from "./index";

const meta = {
  title: "Molecules/RetryState",
  component: RetryState,
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    disabled: { control: "boolean" },
    isRetrying: { control: "boolean" },
  },
} satisfies Meta<typeof RetryState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Failed to load data.",
    onRetry: () => console.log("retrying"),
  },
};

export const Retrying: Story = {
  args: {
    message: "Still trying to connect...",
    isRetrying: true,
    onRetry: () => console.log("retrying"),
  },
};

export const Disabled: Story = {
  args: {
    message: "Too many attempts. Please try again later.",
    disabled: true,
    onRetry: () => console.log("retrying"),
  },
};
