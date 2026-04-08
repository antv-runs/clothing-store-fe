import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListStateWrapper } from "./index";

describe("ListStateWrapper", () => {
  const renderWrapper = (
    overrides: Partial<ComponentProps<typeof ListStateWrapper>> = {},
  ) => {
    const props: ComponentProps<typeof ListStateWrapper> = {
      isLoading: false,
      isRetrying: false,
      isEmpty: false,
      error: null,
      children: <div>Success Content</div>,
      ...overrides,
    };

    return render(<ListStateWrapper {...props} />);
  };

  describe("loading state", () => {
    it("renders loading content and hides children", () => {
      renderWrapper({
        isLoading: true,
        loadingContent: <div>Loading items...</div>,
      });

      expect(screen.getByText("Loading items...")).toBeInTheDocument();
      expect(screen.queryByText("Success Content")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("renders the error state and retry button when retry is available", () => {
      renderWrapper({
        error: "Unable to fetch items.",
        onRetry: jest.fn(),
      });

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Unable to fetch items.",
      );
      expect(screen.getByRole("button", { name: "Retry" })).toBeEnabled();
      expect(screen.queryByText("Success Content")).not.toBeInTheDocument();
    });
  });

  describe("retry behavior", () => {
    it("calls onRetry exactly once when the retry button is clicked", async () => {
      const user = userEvent.setup();
      const onRetry = jest.fn();

      renderWrapper({
        error: "Unable to fetch items.",
        onRetry,
      });

      await user.click(screen.getByRole("button", { name: "Retry" }));

      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe("empty state", () => {
    it("renders the custom empty content when the list is empty", () => {
      renderWrapper({
        isEmpty: true,
        emptyContent: <p>No items found.</p>,
      });

      expect(screen.getByText("No items found.")).toBeInTheDocument();
      expect(screen.queryByText("Success Content")).not.toBeInTheDocument();
    });
  });

  describe("success state", () => {
    it("renders children when there is no loading, error, or empty state", () => {
      renderWrapper();

      expect(screen.getByText("Success Content")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("state priority", () => {
    it("shows error state instead of loading when both are set", () => {
      renderWrapper({
        isLoading: true,
        error: "Unable to fetch items.",
        onRetry: jest.fn(),
        loadingContent: <div>Loading items...</div>,
      });

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Unable to fetch items.",
      );
      expect(screen.queryByText("Loading items...")).not.toBeInTheDocument();
    });

    it("shows error state instead of empty when both are set", () => {
      renderWrapper({
        isEmpty: true,
        error: "Unable to fetch items.",
        onRetry: jest.fn(),
        emptyContent: <p>No items found.</p>,
      });

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Unable to fetch items.",
      );
      expect(screen.queryByText("No items found.")).not.toBeInTheDocument();
    });

    it("shows retry state instead of loading when both are set", () => {
      renderWrapper({
        isLoading: true,
        isRetrying: true,
        onRetry: jest.fn(),
        loadingContent: <div>Loading items...</div>,
      });

      expect(screen.getByRole("alert")).toHaveTextContent("Retrying...");
      expect(screen.queryByText("Loading items...")).not.toBeInTheDocument();
    });
  });
});
