import type { Meta, StoryObj } from "@storybook/react";
import { InputWithIcon } from "./index";

const meta = {
  title: "Molecules/InputWithIcon",
  component: InputWithIcon,
  tags: ["autodocs"],
  argTypes: {
    iconName: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof InputWithIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: "icn_search",
    placeholder: "Search for products...",
    type: "search",
  },
};

export const EmailInput: Story = {
  args: {
    iconName: "icn_email",
    placeholder: "Enter your email",
    type: "email",
  },
};
