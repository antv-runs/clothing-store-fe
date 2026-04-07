import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundary } from "./index";

const meta = {
  title: "Organisms/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

const BuggyComponent = () => {
  throw new Error("I crashed!");
  return <div>Will never render</div>;
};

export const Default: Story = {
  render: () => (
    <ErrorBoundary fallbackMessage="Oops! Something broke down.">
      <BuggyComponent />
    </ErrorBoundary>
  ),
};
