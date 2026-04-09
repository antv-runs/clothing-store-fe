import type { ComponentProps } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CheckoutForm } from "./index";

describe("CheckoutForm", () => {
  const renderForm = (overrides: Partial<ComponentProps<typeof CheckoutForm>> = {}) => {
    return render(
      <CheckoutForm
        onSubmit={jest.fn()}
        isSubmitting={false}
        {...overrides}
      />,
    );
  };

  describe("rendering", () => {
    it("renders all checkout fields and submit button", () => {
      renderForm();
      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Phone")).toBeInTheDocument();
      expect(screen.getByLabelText("Address")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Place Order" })).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("shows required field errors when submitted empty", async () => {
      const handleSubmit = jest.fn();
      renderForm({ onSubmit: handleSubmit });

      fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

      await waitFor(() => {
        expect(screen.getByText("Full name is required.")).toBeInTheDocument();
        expect(screen.getByText("Email is required.")).toBeInTheDocument();
        expect(screen.getByText("Phone is required.")).toBeInTheDocument();
        expect(screen.getByText("Address is required.")).toBeInTheDocument();
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    it("shows format and business-rule errors for invalid values", async () => {
      const handleSubmit = jest.fn();
      renderForm({ onSubmit: handleSubmit });

      fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John1" } });
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john" } });
      fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "123" } });
      fireEvent.change(screen.getByLabelText("Address"), { target: { value: "##" } });

      fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

      await waitFor(() => {
        expect(screen.getByText("Full name cannot contain numbers.")).toBeInTheDocument();
        expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
        expect(screen.getByText("Phone number is too short.")).toBeInTheDocument();
        expect(screen.getByText("Address is too short.")).toBeInTheDocument();
      });
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe("submit flow", () => {
    it("submits normalized values when input is valid", async () => {
      const handleSubmit = jest.fn();
      renderForm({ onSubmit: handleSubmit });

      fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "0123456789" } });
      fireEvent.change(screen.getByLabelText("Address"), { target: { value: "123 Main St" } });

      fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          {
            fullName: "John Doe",
            email: "john@example.com",
            phone: "0123456789",
            address: "123 Main St",
          },
          expect.anything(),
        );
      });
    });
  });

  describe("server error handling", () => {
    it("renders server field errors when provided", () => {
      renderForm({
        serverErrors: { email: "Email already taken" },
      });

      expect(screen.getByText("Email already taken")).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("disables the form and shows loading text while submitting", () => {
      renderForm({ isSubmitting: true });

      expect(screen.getByRole("group")).toBeDisabled();
      expect(
        screen.getByRole("button", { name: "Placing order..." }),
      ).toBeDisabled();
    });
  });
});
