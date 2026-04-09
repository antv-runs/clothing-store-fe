import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WriteReviewModal } from "./index";
import { DEFAULT_GUEST_USERNAME } from "@/const/user";

describe("WriteReviewModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("render", () => {
    it("should not render when isOpen is false", () => {
      const { container } = render(
        <WriteReviewModal
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        container.querySelector(".review-modal--open"),
      ).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      const { container } = render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        container.querySelector(".review-modal--open"),
      ).toBeInTheDocument();
      expect(screen.getByText("Write a Review")).toBeInTheDocument();
    });

    it("should initialize with default rating of 5", () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(screen.getByText("5.0/5")).toBeInTheDocument();
    });

    it("should initialize with default username", () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const usernameInput = screen.getByDisplayValue(DEFAULT_GUEST_USERNAME);
      expect(usernameInput).toBeInTheDocument();
    });
  });

  describe("close behavior", () => {
    it("should call onClose when close button is clicked", async () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const closeButton = screen.getByLabelText("Close review form");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when cancel button is clicked", async () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when backdrop is clicked", async () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const backdrop = document.querySelector(".review-modal__backdrop");
      fireEvent.click(backdrop!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("submit behavior", () => {
    it("should submit form with correct values", async () => {
      mockOnSubmit.mockResolvedValueOnce(undefined);

      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const commentTextarea = screen.getByPlaceholderText(
        "Share your thoughts about this product",
      );
      fireEvent.change(commentTextarea, {
        target: { value: "Great product!" },
      });

      const submitButton = screen.getByRole("button", {
        name: /submit review/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          username: DEFAULT_GUEST_USERNAME,
          comment: "Great product!",
          stars: 5,
        });
      });
    });

    it("should disable form fields while submitting", () => {
      render(
        <WriteReviewModal
          isOpen={true}
          isSubmitting={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeDisabled();
    });

    it("should show loading state on submit button", () => {
      render(
        <WriteReviewModal
          isOpen={true}
          isSubmitting={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const submitButton = screen.getByRole("button", {
        name: /submit review/i,
      });
      expect(submitButton).toHaveAttribute("aria-busy", "true");
    });

    it("should not submit when comment is empty", async () => {
      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const submitButton = screen.getByRole("button", {
        name: /submit review/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it("should show loading state while submitting and recover on error", async () => {
      mockOnSubmit.mockRejectedValueOnce(new Error("Submit failed"));

      const { rerender } = render(
        <WriteReviewModal
          isOpen={true}
          isSubmitting={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const commentTextarea = screen.getByPlaceholderText(
        "Share your thoughts about this product",
      );
      fireEvent.change(commentTextarea, { target: { value: "Test comment" } });

      const submitButton = screen.getByRole("button", {
        name: /submit review/i,
      });
      fireEvent.click(submitButton);

      // Simulate isSubmitting=true (parent component state during request)
      rerender(
        <WriteReviewModal
          isOpen={true}
          isSubmitting={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(submitButton).toHaveAttribute("aria-busy", "true");

      // Simulate isSubmitting=false after error (parent component cleanup)
      rerender(
        <WriteReviewModal
          isOpen={true}
          isSubmitting={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      await waitFor(() => {
        expect(submitButton).not.toHaveAttribute("aria-busy");
      });
    });
  });

  describe("rating picker", () => {
    it("should update rating when star button is clicked", async () => {
      mockOnSubmit.mockResolvedValueOnce(undefined);

      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      const firstStarButton = screen
        .getAllByRole("button")
        .find((btn) =>
          btn.getAttribute("aria-label")?.includes("Set rating to 1 stars"),
        );

      fireEvent.click(firstStarButton!);

      expect(screen.getByText("1.0/5")).toBeInTheDocument();
    });

    it("should support half ratings", async () => {
      mockOnSubmit.mockResolvedValueOnce(undefined);

      render(
        <WriteReviewModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      // Get first star button
      const starButtons = screen
        .getAllByRole("button")
        .filter((btn) =>
          btn.getAttribute("aria-label")?.includes("Set rating to"),
        );

      // Simulate clicking left half (half star)
      const firstStarButton = starButtons[0];
      const rect = firstStarButton.getBoundingClientRect();
      fireEvent.click(firstStarButton, {
        clientX: rect.left + rect.width / 4, // Left half
      });

      expect(screen.getByText("0.5/5")).toBeInTheDocument();
    });
  });
});
