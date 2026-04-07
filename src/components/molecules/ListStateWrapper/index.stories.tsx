import type { Meta, StoryObj } from "@storybook/react";
import { ListStateWrapper } from "./index";

const meta = {
  title: "Molecules/ListStateWrapper",
  component: ListStateWrapper,
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    isRetrying: { control: "boolean" },
    isEmpty: { control: "boolean" },
    error: { control: "text" },
    isRetryable: { control: "boolean" },
  },
} satisfies Meta<typeof ListStateWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    isRetrying: false,
    isEmpty: false,
    error: null,
    children: <div>Data loaded successfully!</div>,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    isRetrying: false,
    isEmpty: false,
    error: null,
    loadingContent: <div>Loading items...</div>,
    children: <div>Content</div>,
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    isRetrying: false,
    isEmpty: true,
    error: null,
    children: <div>Content</div>,
  },
};

export const Error: Story = {
  args: {
    isLoading: false,
    isRetrying: false,
    isEmpty: false,
    error: "Failed to load the items.",
    children: <div>Content</div>,
  },
};
