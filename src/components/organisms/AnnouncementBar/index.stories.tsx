import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBar } from "./index";

const meta = {
  title: "Organisms/AnnouncementBar",
  component: AnnouncementBar,
  tags: ["autodocs"],
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
