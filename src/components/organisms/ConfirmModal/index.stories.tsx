import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmModal } from "./index";

const meta = {
  title: "Organisms/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    isProcessing: { control: "boolean" },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Delete Item",
    message: "Are you sure you want to delete this item? This action cannot be undone.",
    onClose: () => console.log("close"),
    onConfirm: () => console.log("confirm"),
  },
};

export const Processing: Story = {
  args: {
    isOpen: true,
    title: "Processing Payment",
    message: "Please wait while we process your payment. Do not close this window.",
    isProcessing: true,
    onClose: () => console.log("close"),
    onConfirm: () => console.log("confirm"),
  },
};
