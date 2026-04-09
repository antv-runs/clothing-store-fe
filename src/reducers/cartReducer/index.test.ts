import { cartReducer, type CartState } from "./index";
import {
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    hydrateCart,
} from "@/actions/cartAction";

describe("cartReducer", () => {
    const initialState: CartState = { items: [] };

    describe("initialization", () => {
        it("returns initial state when reducer receives undefined state", () => {
            // @ts-expect-error checking fallback for redux dispatch initialization
            expect(cartReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
        });

        it("supports hydration overrides", () => {
            const payload = [{ productId: "p1", quantity: 10, color: "red", size: "M" }];
            const action = hydrateCart(payload);
            const state = cartReducer(initialState, action);

            expect(state.items).toEqual(payload);
        });
    });

    describe("add item behavior", () => {
        it("adds a new cart item when the cart is empty", () => {
            const action = addItem({ productId: "p1", quantity: 2, color: "red", size: "M" });
            const state = cartReducer(initialState, action);

            expect(state.items).toHaveLength(1);
            expect(state.items[0]).toEqual({ productId: "p1", quantity: 2, color: "red", size: "M" });
        });

        it("merges quantity when adding the same product and variant", () => {
            const startState: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };
            const action = addItem({ productId: "p1", quantity: 3, color: "red", size: "M" });
            const state = cartReducer(startState, action);

            expect(state.items).toHaveLength(1);
            expect(state.items[0].quantity).toBe(4);
        });

        it("keeps different variants of the same product as separate lines", () => {
            const startState: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };

            const action1 = addItem({ productId: "p1", quantity: 1, color: "red", size: "L" });
            const state1 = cartReducer(startState, action1);

            const action2 = addItem({ productId: "p1", quantity: 1, color: "blue", size: "M" });
            const state2 = cartReducer(state1, action2);

            expect(state2.items).toHaveLength(3);
        });

        it("normalizes invalid quantities to minimum quantity", () => {
            const action1 = addItem({ productId: "p1", quantity: -5, color: "red", size: "M" });
            const state1 = cartReducer(initialState, action1);
            expect(state1.items[0].quantity).toBe(1);

            // @ts-expect-error intentionally passing invalid string payload
            const action2 = addItem({ productId: "p2", quantity: "abc", color: "red", size: "M" });
            const state2 = cartReducer(state1, action2);
            expect(state2.items[1].quantity).toBe(1);
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

            const action = increaseQuantity("p1", "red", "M");
            const state = cartReducer(startState, action);

            expect(state.items[0].quantity).toBe(2);
            expect(state.items[1].quantity).toBe(2);
        });

        it("decreases quantity but never below one", () => {
            const startState: CartState = {
                items: [
                    { productId: "p1", quantity: 2, color: "red", size: "M" },
                    { productId: "p2", quantity: 1, color: null, size: null }
                ],
            };

            const action1 = decreaseQuantity("p1", "red", "M");
            const state1 = cartReducer(startState, action1);
            expect(state1.items[0].quantity).toBe(1);

            const action2 = decreaseQuantity("p2", null, null);
            const state2 = cartReducer(state1, action2);
            expect(state2.items[1].quantity).toBe(1);
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

            const action = removeItem("p1", "red", "M");
            const state = cartReducer(startState, action);

            expect(state.items).toHaveLength(1);
            expect(state.items[0].color).toBe("blue");
        });

        it("clears all cart items on CLEAR_CART", () => {
            const startState: CartState = {
                items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
            };
            const action = clearCart();
            const state = cartReducer(startState, action);

            expect(state.items).toHaveLength(0);
        });
    });
});
