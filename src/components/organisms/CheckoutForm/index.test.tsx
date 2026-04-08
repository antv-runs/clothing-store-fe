import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CheckoutForm } from "./index";

describe("CheckoutForm", () => {
  it("renders form elements", () => {
    render(<CheckoutForm onSubmit={jest.fn()} isSubmitting={false} />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place Order" })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const handleSubmit = jest.fn();
    render(<CheckoutForm onSubmit={handleSubmit} isSubmitting={false} />);

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(screen.getByText("Full name is required.")).toBeInTheDocument();
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(screen.getByText("Phone is required.")).toBeInTheDocument();
      expect(screen.getByText("Address is required.")).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it("submits the form with valid data", async () => {
    const handleSubmit = jest.fn();
    render(<CheckoutForm onSubmit={handleSubmit} isSubmitting={false} />);

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
        expect.anything()
      );
    });
  });

  it("displays server errors and global error", () => {
    render(
      <CheckoutForm
        onSubmit={jest.fn()}
        isSubmitting={false}
        globalError="Something went wrong"
        serverErrors={{ email: "Email already taken" }}
      />
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Email already taken")).toBeInTheDocument();
  });
});
