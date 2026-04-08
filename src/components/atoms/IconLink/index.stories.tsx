import type { Meta, StoryObj } from "@storybook/react";
import { IconLink } from "./index";

const meta = {
  title: "Atoms/IconLink",
  component: IconLink,
  tags: ["autodocs"],
  argTypes: {
    iconName: { control: "text" },
    href: { control: "text" },
    label: { control: "text" },
  },
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: "cart",
    href: "#",
    label: "Go to cart",
    size: 40,
    iconWidth: 24,
    iconHeight: 24,
  },
};

export const ExternalConfig: Story = {
  args: {
    iconName: "cart",
    href: "https://example.com",
    label: "External link",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};
