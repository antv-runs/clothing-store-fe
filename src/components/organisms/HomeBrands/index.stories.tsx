import type { Meta, StoryObj } from "@storybook/react";
import { HomeBrands } from "./index";

const meta = {
  title: "Organisms/HomeBrands",
  component: HomeBrands,
  tags: ["autodocs"],
} satisfies Meta<typeof HomeBrands>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
