import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ToastContainer } from "./index";

const meta = {
  title: "Organisms/ToastContainer",
  component: ToastContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toasts: [
      { id: "t1", message: "Success! Item added to cart.", variant: "success" },
      { id: "t2", message: "Could not apply promotional code.", variant: "error" },
      { id: "t3", message: "Your session will expire soon.", variant: "info" },
    ],
    onDismiss: (id) => logger.log("Dismiss toast:", id),
  },
};
