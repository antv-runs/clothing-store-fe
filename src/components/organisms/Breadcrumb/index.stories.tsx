import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./index";

const meta = {
  title: "Organisms/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ["Home", "Men", "T-Shirts"],
  },
};
