import type { Meta, StoryObj } from "@storybook/react";
import { FooterNavSection } from "./index";

const meta = {
  title: "Molecules/FooterNavSection",
  component: FooterNavSection,
  tags: ["autodocs"],
} satisfies Meta<typeof FooterNavSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Company",
    links: [{
      "label": "About Us",
      "href": "/about"
    }, {
      "label": "Careers",
      "href": "/careers"
    }, {
      "label": "Contact",
      "href": "/contact"
    }],
  },
};
