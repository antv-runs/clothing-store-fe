import type { Meta, StoryObj } from "@storybook/react";
import { BrandImage } from "./index";

const meta = {
  title: "Atoms/BrandImage",
  component: BrandImage,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
} satisfies Meta<typeof BrandImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/150",
    alt: "Brand Logo",
    width: 150,
    height: 150,
  },
};

export const CustomSize: Story = {
  args: {
    src: "https://via.placeholder.com/300x100",
    alt: "Brand Logo Wide",
    width: 300,
    height: 100,
  },
};
