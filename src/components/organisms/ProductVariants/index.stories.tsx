import { logger } from "@/utils/logger";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductVariants } from "./index";

const meta = {
  title: "Organisms/ProductVariants",
  component: ProductVariants,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductVariants>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variants: {
      colors: [
        { id: "c1", label: "Olive", colorCode: "#4F5D54" },
        { id: "c2", label: "Navy", colorCode: "#1E2741" },
        { id: "c3", label: "White", colorCode: "#FFFFFF" },
      ],
      sizes: [
        { id: "s1", label: "Small", inStock: true },
        { id: "s2", label: "Medium", inStock: true },
        { id: "s3", label: "Large", inStock: false },
        { id: "s4", label: "X-Large", inStock: true },
      ],
    },
    onColorSelect: (val) => logger.log("color", val),
    onSizeSelect: (val) => logger.log("size", val),
  },
};
