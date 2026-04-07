import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkout from "@/pages/Checkout";
import { createOrder } from "@/api/Order";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";
import { ApiError } from "@/utils/apiError";

const mockNavigate = jest.fn();
const mockUseCartRows = jest.fn();

jest.mock("@/api/Order", () => ({
  createOrder: jest.fn(),
}));

jest.mock("@/utils/cartStorage", () => ({
  readStoredCartRows: jest.fn(),
  writeStoredCartRows: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("@/hooks/useCartRows", () => ({
  useCartRows: () => mockUseCartRows(),
}));

jest.mock("@/components/organisms/CheckoutSummaryPanel", () => ({
  CheckoutSummaryPanel: () => null,
}));

const mockedCreateOrder = createOrder as jest.MockedFunction<
  typeof createOrder
>;
const mockedReadStoredCartRows = readStoredCartRows as jest.MockedFunction<
  typeof readStoredCartRows
>;
const mockedWriteStoredCartRows = writeStoredCartRows as jest.MockedFunction<
  typeof writeStoredCartRows
>;

describe("Checkout submit flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReset();
    mockUseCartRows.mockReturnValue({
      cartRows: [],
      cartItems: [],
      summary: { subtotal: 0, discount: 0, delivery: 0, total: 0 },
      isEmpty: false,
      isLoading: false,
      getCartRows: () => mockedReadStoredCartRows(),
      addItem: jest.fn(),
      clearCart: () => mockedWriteStoredCartRows([]),
    });
  });

  it("cart empty -> API not called", async () => {
    mockedReadStoredCartRows.mockReturnValue([]);

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedCreateOrder).not.toHaveBeenCalled();
    });
  });

  it("cart has items -> API called with correct payload", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "1", quantity: 2, color: "black", size: "L" },
      { productId: "2", quantity: 1, color: "white", size: "M" },
    ]);
    mockedCreateOrder.mockResolvedValue({} as never);

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledWith({
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "0123456789",
          address: "123 Main Street",
        },
        items: [
          { product_id: 1, quantity: 2, color: "black", size: "L" },
          { product_id: 2, quantity: 1, color: "white", size: "M" },
        ],
      });
    });
  });

  it("success -> shows success state, clears cart, and navigates home", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "1", quantity: 1, color: "black", size: "L" },
    ]);
    mockedCreateOrder.mockResolvedValue({} as never);

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedWriteStoredCartRows).toHaveBeenCalledWith([]);
    });

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your order has been placed successfully.",
    );

    const backToHomeButton = screen.getByRole("button", {
      name: "Back to Home",
    });

    fireEvent.click(backToHomeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("failure -> shows error message and allows retry", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "1", quantity: 1, color: "black", size: "L" },
    ]);
    mockedCreateOrder.mockRejectedValueOnce(
      new ApiError({
        message: "Request failed",
        uiMessage: "Please check your payment details and try again.",
        status: 500,
      }),
    );

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please check your payment details and try again.",
    );

    const submitButton = screen.getByRole("button", { name: "Place Order" });
    expect(submitButton).toBeEnabled();

    mockedCreateOrder.mockResolvedValueOnce({} as never);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledTimes(2);
    });
  });

  it("loading state prevents duplicate submit", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "1", quantity: 1, color: "black", size: "L" },
    ]);
    mockedCreateOrder.mockImplementation(() => {
      return new Promise(() => undefined) as never;
    });

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    const submitButton = screen.getByRole("button", { name: "Place Order" });
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByRole("button", { name: "Placing order..." }),
    ).toBeDisabled();
  });

  it("invalid cart item -> blocks request and shows message", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "bad-id", quantity: 1, color: "black", size: "L" },
    ]);

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0123456789" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid product selected in cart item #1.",
    );
    expect(mockedCreateOrder).not.toHaveBeenCalled();
  });
});
