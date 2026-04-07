import type { Meta, StoryObj } from "@storybook/react";
import { SocialLinks } from "./index";

const meta = {
  title: "Molecules/SocialLinks",
  component: SocialLinks,
  tags: ["autodocs"],
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Facebook", iconName: "icn_facebook" },
      { label: "Twitter", iconName: "icn_twitter" },
      { label: "Instagram", iconName: "icn_instagram" },
    ],
  },
};
