import { checkoutSchema } from "@/types/checkout";

describe("checkoutSchema", () => {
  it("fullName empty -> fail", () => {
    const result = checkoutSchema.safeParse({
      fullName: "",
      email: "john@example.com",
      address: "123 Main Street",
    });

    expect(result.success).toBe(false);
  });

  it("fullName too short -> fail", () => {
    const result = checkoutSchema.safeParse({
      fullName: "A",
      email: "john@example.com",
      address: "123 Main Street",
    });

    expect(result.success).toBe(false);
  });

  it("email invalid -> fail", () => {
    const result = checkoutSchema.safeParse({
      fullName: "John Doe",
      email: "invalid-email",
      address: "123 Main Street",
    });

    expect(result.success).toBe(false);
  });

  it("address too short -> fail", () => {
    const result = checkoutSchema.safeParse({
      fullName: "John Doe",
      email: "john@example.com",
      address: "123",
    });

    expect(result.success).toBe(false);
  });

  it("valid data -> pass", () => {
    const result = checkoutSchema.safeParse({
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main Street",
    });

    expect(result.success).toBe(true);
  });
});
