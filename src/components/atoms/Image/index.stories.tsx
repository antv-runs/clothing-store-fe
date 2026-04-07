import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./index";

const meta = {
  title: "Atoms/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    fit: {
      control: "select",
      options: ["cover", "contain"],
    },
    showPlaceholder: { control: "boolean" },
    isLoaded: { control: "boolean" },
    isError: { control: "boolean" },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Placeholder",
    width: 300,
    height: 300,
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: "",
    alt: "Placeholder",
    width: 300,
    height: 300,
    showPlaceholder: true,
  },
};

export const LoadedState: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Placeholder",
    width: 300,
    height: 300,
    isLoaded: true,
  },
};

export const ErrorState: Story = {
  args: {
    src: "invalid-url",
    alt: "Error Image",
    width: 300,
    height: 300,
    isError: true,
  },
};
