import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    unstyled: { control: "boolean" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button Text",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Action",
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    children: "Submit",
    isLoading: true,
    loadingText: "Submitting...",
  },
};

export const Disabled: Story = {
  args: {
    children: "Cannot click",
    disabled: true,
  },
};

export const Unstyled: Story = {
  args: {
    children: "Raw Button",
    unstyled: true,
  },
};
