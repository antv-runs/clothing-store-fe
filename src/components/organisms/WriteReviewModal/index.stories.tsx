import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { WriteReviewModal } from "./index";

const meta = {
  title: "Organisms/WriteReviewModal",
  component: WriteReviewModal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    isSubmitting: { control: "boolean" },
  },
} satisfies Meta<typeof WriteReviewModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    isSubmitting: false,
    onClose: () => logger.log("close"),
    onSubmit: (values) => logger.log("submit", values),
  },
};
