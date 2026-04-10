import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutForm } from "./index.tsx";
import type { CheckoutFormValues } from "./index.schema";

const meta: Meta<typeof CheckoutForm> = {
  title: "Organisms/CheckoutForm",
  component: CheckoutForm,
  parameters: {
    layout: "padded",
  },
  args: {
    onSubmit: (values: CheckoutFormValues) => logger.log("Submitted", values),
    isSubmitting: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const Default: Story = {};

export const WithInitialValues: Story = {
  args: {
    defaultValues: {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "1234567890",
      address: "123 Main St",
    },
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};

export const WithServerError: Story = {
  args: {
    serverErrors: {
      email: "This email is already registered.",
    },
    globalError: "Please fix the errors above before continuing.",
  },
};
