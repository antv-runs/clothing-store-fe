import type { Meta, StoryObj } from "@storybook/react";
import { ProductGallery } from "./index";

const meta = {
  title: "Organisms/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName: "T-Shirt",
    images: [
      { id: "img-1", url: "https://via.placeholder.com/400x500?text=1", sort_order: 1 },
      { id: "img-2", url: "https://via.placeholder.com/400x500?text=2", sort_order: 2 },
      { id: "img-3", url: "https://via.placeholder.com/400x500?text=3", sort_order: 3 },
    ],
  },
};
