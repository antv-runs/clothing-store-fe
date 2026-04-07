import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox } from "./index";

const meta = {
  title: "Molecules/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
