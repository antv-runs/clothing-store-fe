import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkout from "@/pages/Checkout";

describe("Checkout page UI behavior", () => {
  it("renders form elements", () => {
    render(<Checkout />);

    expect(
      screen.getByRole("heading", { name: "Checkout" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Place Order",
      }),
    ).toBeInTheDocument();
  });

  it("submit empty form shows validation errors", async () => {
    render(<Checkout />);

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(screen.getByText("Full name is required.")).toBeInTheDocument();
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(screen.getByText("Address is required.")).toBeInTheDocument();
    });
  });

  it("typing updates input values", () => {
    render(<Checkout />);

    const fullNameInput = screen.getByLabelText(
      "Full Name",
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const addressInput = screen.getByLabelText("Address") as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(addressInput, { target: { value: "456 Market Street" } });

    expect(fullNameInput.value).toBe("Jane Doe");
    expect(emailInput.value).toBe("jane@example.com");
    expect(addressInput.value).toBe("456 Market Street");
  });

  it("errors disappear when input is corrected", async () => {
    render(<Checkout />);

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    expect(
      await screen.findByText("Full name is required."),
    ).toBeInTheDocument();

    const fullNameInput = document.querySelector(
      'input[name="fullName"]',
    ) as HTMLInputElement;

    expect(fullNameInput).toBeInTheDocument();
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Full name is required."),
      ).not.toBeInTheDocument();
    });
  });
});
