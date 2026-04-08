import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbItem } from "./index";

const meta = {
  title: "Molecules/BreadcrumbItem",
  component: BreadcrumbItem,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
    isActive: { control: "boolean" },
  },
} satisfies Meta<typeof BreadcrumbItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Home",
    href: "/",
  },
};

export const Active: Story = {
  args: {
    label: "Current Page",
    isActive: true,
  },
};
