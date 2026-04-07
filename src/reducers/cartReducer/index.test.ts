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

    it("1. returns the correct initial state when reducer receives undefined state", () => {
        // @ts-expect-error checking fallback for redux dispatch initialization
        expect(cartReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
    });

    it("2. adds a new cart item when the cart is empty", () => {
        const action = addItem({ productId: "p1", quantity: 2, color: "red", size: "M" });
        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual({ productId: "p1", quantity: 2, color: "red", size: "M" });
    });

    it("3. merges into the existing line and increases quantity when adding the same product with the same variant identity", () => {
        const startState: CartState = {
            items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
        };
        const action = addItem({ productId: "p1", quantity: 3, color: "red", size: "M" });
        const state = cartReducer(startState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(4);
    });

    it("4. keeps different variants of the same product as separate cart lines", () => {
        const startState: CartState = {
            items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
        };
        
        // Same product, different size
        const action1 = addItem({ productId: "p1", quantity: 1, color: "red", size: "L" });
        const state1 = cartReducer(startState, action1);

        // Same product, different color
        const action2 = addItem({ productId: "p1", quantity: 1, color: "blue", size: "M" });
        const state2 = cartReducer(state1, action2);

        expect(state2.items).toHaveLength(3);
    });

    it("5. increases the quantity for the correct cart line", () => {
        const startState: CartState = {
            items: [
                { productId: "p1", quantity: 1, color: "red", size: "M" },
                { productId: "p2", quantity: 2, color: null, size: null }
            ],
        };
        
        const action = increaseQuantity("p1", "red", "M");
        const state = cartReducer(startState, action);

        expect(state.items[0].quantity).toBe(2);
        expect(state.items[1].quantity).toBe(2); // Should remain untouched
    });

    it("6. decreases quantity correctly and does not produce invalid negative quantity", () => {
        const startState: CartState = {
            items: [
                { productId: "p1", quantity: 2, color: "red", size: "M" },
                { productId: "p2", quantity: 1, color: null, size: null }
            ],
        };
        
        // Decrease safely
        const action1 = decreaseQuantity("p1", "red", "M");
        const state1 = cartReducer(startState, action1);
        expect(state1.items[0].quantity).toBe(1);

        // Try decreasing an item already at 1 below bounds
        const action2 = decreaseQuantity("p2", null, null);
        const state2 = cartReducer(state1, action2);
        expect(state2.items[1].quantity).toBe(1); // Min is floored at 1 per logic
    });

    it("7. removes the correct cart line only", () => {
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

    it("8. resets cart items correctly on CLEAR_CART", () => {
        const startState: CartState = {
            items: [{ productId: "p1", quantity: 1, color: "red", size: "M" }],
        };
        const action = clearCart();
        const state = cartReducer(startState, action);

        expect(state.items).toHaveLength(0);
    });

    it("9. defensively normalizes invalid quantity payloads when adding items", () => {
        // passing invalid negative payload defensively checks floor binding
        const action1 = addItem({ productId: "p1", quantity: -5, color: "red", size: "M" });
        const state1 = cartReducer(initialState, action1);
        expect(state1.items[0].quantity).toBe(1);

        // @ts-expect-error intentionally passing invalid string payload
        const action2 = addItem({ productId: "p2", quantity: "abc", color: "red", size: "M" });
        const state2 = cartReducer(state1, action2);
        expect(state2.items[1].quantity).toBe(1);
    });

    it("supports hydration overrides", () => {
        const payload = [{ productId: "p1", quantity: 10, color: "red", size: "M" }];
        const action = hydrateCart(payload);
        const state = cartReducer(initialState, action);

        expect(state.items).toEqual(payload);
    });
});
