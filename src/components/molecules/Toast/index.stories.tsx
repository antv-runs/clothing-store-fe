import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./index";

const meta = {
  title: "Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "info"],
    },
    message: { control: "text" },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    id: "t1",
    message: "This is an informational message.",
    variant: "info",
    onClose: (id) => console.log("close", id),
  },
};

export const Success: Story = {
  args: {
    id: "t2",
    message: "Action completed successfully!",
    variant: "success",
    onClose: (id) => console.log("close", id),
  },
};

export const Error: Story = {
  args: {
    id: "t3",
    message: "Something went wrong.",
    variant: "error",
    onClose: (id) => console.log("close", id),
  },
};
