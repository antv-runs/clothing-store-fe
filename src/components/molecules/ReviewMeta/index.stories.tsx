import type { Meta, StoryObj } from "@storybook/react";
import { ReviewMeta } from "./index";

const meta = {
  title: "Molecules/ReviewMeta",
  component: ReviewMeta,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    isVerified: { control: "boolean" },
  },
} satisfies Meta<typeof ReviewMeta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
  },
};

export const Verified: Story = {
  args: {
    name: "Jane Smith",
    isVerified: true,
  },
};
