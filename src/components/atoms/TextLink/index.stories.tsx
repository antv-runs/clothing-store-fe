import type { Meta, StoryObj } from "@storybook/react";
import { TextLink } from "./index";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Click here",
  },
};

export const ExternalConfig: Story = {
  args: {
    href: "https://example.com",
    children: "External Link",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};
