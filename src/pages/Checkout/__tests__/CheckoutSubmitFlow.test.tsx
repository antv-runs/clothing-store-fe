import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkout from "@/pages/Checkout";
import { createOrder } from "@/api/Order";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";

jest.mock("@/api/Order", () => ({
  createOrder: jest.fn(),
}));

jest.mock("@/utils/cartStorage", () => ({
  readStoredCartRows: jest.fn(),
  writeStoredCartRows: jest.fn(),
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
      { productId: "p1", quantity: 2, color: null, size: null },
      { productId: "p2", quantity: 1, color: null, size: null },
    ]);
    mockedCreateOrder.mockResolvedValue({} as never);

    render(<Checkout />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledWith({
        customer_name: "John Doe",
        customer_email: "john@example.com",
        address: "123 Main Street",
        items: [
          { product_id: "p1", quantity: 2 },
          { product_id: "p2", quantity: 1 },
        ],
      });
    });
  });

  it("success -> cart cleared and form reset", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "p1", quantity: 1, color: null, size: null },
    ]);
    mockedCreateOrder.mockResolvedValue({} as never);

    render(<Checkout />);

    const fullNameInput = screen.getByLabelText(
      "Full Name",
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const addressInput = screen.getByLabelText("Address") as HTMLInputElement;

    fireEvent.change(fullNameInput, {
      target: { value: "John Doe" },
    });
    fireEvent.change(emailInput, {
      target: { value: "john@example.com" },
    });
    fireEvent.change(addressInput, {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedWriteStoredCartRows).toHaveBeenCalledWith([]);
    });

    await waitFor(() => {
      expect(fullNameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(addressInput.value).toBe("");
    });
  });

  it("failure -> cart not cleared", async () => {
    mockedReadStoredCartRows.mockReturnValue([
      { productId: "p1", quantity: 1, color: null, size: null },
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
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: "123 Main Street" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
    });

    expect(mockedWriteStoredCartRows).not.toHaveBeenCalled();
  });
});
