import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductTabsNav } from "./index";

const meta = {
  title: "Molecules/ProductTabsNav",
  component: ProductTabsNav,
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: "select",
      options: ["tc-details", "tc-reviews", "tc-faqs"],
    },
  },
} satisfies Meta<typeof ProductTabsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DetailsActive: Story = {
  args: {
    activeTab: "tc-details",
    onTabSelect: (tab) => logger.log("selected", tab),
  },
};

export const ReviewsActive: Story = {
  args: {
    activeTab: "tc-reviews",
    onTabSelect: (tab) => logger.log("selected", tab),
  },
};
