import cartReducer, {
    hydrateCart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    type CartState,
} from "./cartSlice";

describe("cartSlice", () => {
    const initialState: CartState = { items: [] };

    describe("initialization", () => {
        it("returns initial state", () => {
            expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
        });

        it("supports hydration overrides", () => {
            const payload = [{ productId: "p1", quantity: 10, color: "red", size: "M" }];
            const state = cartReducer(initialState, hydrateCart(payload));

            expect(state.items).toEqual(payload);
        });
    });

    describe("add item behavior", () => {
        it("adds a new cart item when the cart is empty", () => {
            const state = cartReducer(initialState, addItem({ productId: "p1", quantity: 2, color: "red", size: "M" }));

            expect(state.items).toHaveLength(1);
            expect(state.items[0]).toEqual({ productId: "p1", quantity: 2, color: "red", size: "M" });
        });

        it("merges quantity when adding the same product and variant", () => {
            const startState: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };
            const state = cartReducer(startState, addItem({ productId: "p1", quantity: 3, color: "red", size: "M" }));

            expect(state.items).toHaveLength(1);
            expect(state.items[0].quantity).toBe(4);
        });

        it("keeps different variants of the same product as separate lines", () => {
            let state: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };

            state = cartReducer(state, addItem({ productId: "p1", quantity: 1, color: "red", size: "L" }));
            state = cartReducer(state, addItem({ productId: "p1", quantity: 1, color: "blue", size: "M" }));

            expect(state.items).toHaveLength(3);
        });

        it("normalizes invalid quantities to minimum quantity", () => {
            let state = cartReducer(initialState, addItem({ productId: "p1", quantity: -5, color: "red", size: "M" }));
            expect(state.items[0].quantity).toBe(1);

            // @ts-expect-error intentionally passing invalid string payload
            state = cartReducer(state, addItem({ productId: "p2", quantity: "abc", color: "red", size: "M" }));
            expect(state.items[1].quantity).toBe(1);
        });
    });

    describe("quantity updates", () => {
        it("increases quantity for the matching cart line only", () => {
            const startState: CartState = {
                items: [
                    { productId: "p1", quantity: 1, color: "red", size: "M" },
                    { productId: "p2", quantity: 2, color: null, size: null }
                ],
            };

            const state = cartReducer(startState, increaseQuantity({ productId: "p1", color: "red", size: "M" }));

            expect(state.items[0].quantity).toBe(2);
            expect(state.items[1].quantity).toBe(2);
        });

        it("decreases quantity but never below one", () => {
            let state: CartState = {
                items: [
                    { productId: "p1", quantity: 2, color: "red", size: "M" },
                    { productId: "p2", quantity: 1, color: null, size: null }
                ],
            };

            state = cartReducer(state, decreaseQuantity({ productId: "p1", color: "red", size: "M" }));
            expect(state.items[0].quantity).toBe(1);

            state = cartReducer(state, decreaseQuantity({ productId: "p2", color: null, size: null }));
            expect(state.items[1].quantity).toBe(1);
        });
    });

    describe("removal and reset", () => {
        it("removes only the targeted cart line", () => {
            const startState: CartState = {
                items: [
                    { productId: "p1", quantity: 1, color: "red", size: "M" },
                    { productId: "p1", quantity: 1, color: "blue", size: "M" }
                ],
            };

            const state = cartReducer(startState, removeItem({ productId: "p1", color: "red", size: "M" }));

            expect(state.items).toHaveLength(1);
            expect(state.items[0].color).toBe("blue");
        });

        it("clears all cart items on clearCart", () => {
            const startState: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };
            const state = cartReducer(startState, clearCart());

            expect(state.items).toHaveLength(0);
        });
    });
});
