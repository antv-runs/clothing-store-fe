# Cart Reducer Testing

## Overview
This document outlines the test coverage for the Redux cart reducer (`src/reducers/cartReducer/index.ts`). It describes the exact scenarios tested, expected behaviors, and the specific rules used for cart line management based directly on the assertions in `src/reducers/cartReducer/index.test.ts`.

## Cart Item Identity Rule
The tests verify that cart line identity strongly enforces a strict triplet standard: **`productId + color + size`**.
* If an item is added where all three properties match an existing line, its quantity is merged.
* If any of these properties differ (e.g., same product but different size or color), it is treated as an entirely separate cart line.

## Tested Scenarios

### 1. Initial State
* **Tested Action:** Dispatching an unknown/initialization action with an `undefined` state.
* **Expected Behavior:** The reducer returns the correct default initial state (`{ items: [] }`).

### 2. Add Item (Empty Cart)
* **Tested Action:** Firing `ADD_ITEM` with a new item to a completely empty cart.
* **Expected Behavior:** Appends the item and returns a state containing exactly one row with the correct passed payload.

### 3. Merge Same Item
* **Tested Action:** Firing `ADD_ITEM` with a product variant whose identity (`productId`, `color`, `size`) matches a line already inside the cart.
* **Expected Behavior:** Locates the existing line and increases its total quantity by the new payload's amount rather than duplicating the row.

### 4. Non-Merge Cases (Different Variants)
* **Tested Action:** Firing `ADD_ITEM` using a product ID that already exists in the cart, but providing either a different size or color.
* **Expected Behavior:** Bypasses identity match and properly creates explicitly distinct cart lines ensuring sizes/colors do not collapse into each other.

### 5. Increase Quantity
* **Tested Action:** Firing `INCREASE_QUANTITY` with a specific identity triplet on a populated cart.
* **Expected Behavior:** Accurately targets the unique cart row matching the exact identity rule and increments only its quantity by `1`.

### 6. Decrease Quantity
* **Tested Action:** Firing `DECREASE_QUANTITY` with a specific identity triplet where quantity > 1.
* **Expected Behavior:** Accurately targets the unique cart row and decrements its quantity by `1`.

### 7. Remove Item
* **Tested Action:** Firing `REMOVE_ITEM` matching a specific variant's identity.
* **Expected Behavior:** Plucks the targeted line entirely out of the sequence while preventing identical product IDs with different colors/sizes from inadvertently being deleted.

### 8. Clear Cart
* **Tested Action:** Firing `CLEAR_CART` on a populated array.
* **Expected Behavior:** Purges the array instantly and returns an empty items list (`length: 0`).

### 9. Hydrate Cart (Override)
* **Tested Action:** Firing `HYDRATE_CART` packed with an overriding array of data.
* **Expected Behavior:** Effectively overrides the state's `items` array with the target array.

## Edge Cases Covered

* **Invalid Input Normalization:** Passing an illegal string (`"abc"`) or a negative quantity (`-5`) defensively floors the entry directly to a baseline minimum fallback (`quantity: 1`).
* **Floor Bound Limitations on Decrease:** Attempting to cast `DECREASE_QUANTITY` on an item already sitting at `quantity: 1` prevents generation of a `0` or negative metric, anchoring back to `1`.

## Gaps / Future Tests

* **Missing Implicit Line Auto-Deletion:** Since the cart purely floors values at `1` structurally, there is no automatic line cleanup logic mapped. UI interactions expecting an item to vanish when decreasing a `1` value must strictly implement UI-level `REMOVE_ITEM` dispatches. We lack integration tests bridging this boundary logic yet.
* **Missing Total/Pricing Computations:** The tests do not assert any price scaling since the raw `CartRow` model inherently lacks any standalone price tracking.
