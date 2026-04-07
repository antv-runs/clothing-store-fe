import type { Meta, StoryObj } from "@storybook/react";
import { NavMenu } from "./index";

const meta = {
  title: "Molecules/NavMenu",
  component: NavMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
