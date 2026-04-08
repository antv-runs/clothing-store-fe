import {
    type CartActionTypes,
    ADD_ITEM,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    SET_QUANTITY,
    REMOVE_ITEM,
    CLEAR_CART,
    HYDRATE_CART,
} from "@/actions/cartAction";
import type { CartRow } from "@/types/cart";

export interface CartState {
    items: CartRow[];
}

const initialState: CartState = {
    items: [],
};

const DEFAULT_QUANTITY = 1;

export const cartReducer = (
    state = initialState,
    action: CartActionTypes
): CartState => {
    switch (action.type) {
        case HYDRATE_CART:
            return {
                ...state,
                items: action.payload,
            };

        case ADD_ITEM: {
            const newItem = action.payload;
            const normalizedQuantity = Math.max(
                DEFAULT_QUANTITY,
                Number(newItem.quantity) || DEFAULT_QUANTITY
            );

            const existingIndex = state.items.findIndex(
                (item) =>
                    item.productId === newItem.productId &&
                    item.color === newItem.color &&
                    item.size === newItem.size
            );

            if (existingIndex >= 0) {
                const nextItems = [...state.items];
                nextItems[existingIndex] = {
                    ...nextItems[existingIndex],
                    quantity: nextItems[existingIndex].quantity + normalizedQuantity,
                };
                return { ...state, items: nextItems };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...newItem,
                        quantity: normalizedQuantity,
                    },
                ],
            };
        }

        case INCREASE_QUANTITY: {
            const { productId, color, size } = action.payload;
            return {
                ...state,
                items: state.items.map((item) => {
                    if (
                        item.productId === productId &&
                        item.color === color &&
                        item.size === size
                    ) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                }),
            };
        }

        case DECREASE_QUANTITY: {
            const { productId, color, size } = action.payload;
            return {
                ...state,
                items: state.items.map((item) => {
                    if (
                        item.productId === productId &&
                        item.color === color &&
                        item.size === size
                    ) {
                        return {
                            ...item,
                            quantity: Math.max(DEFAULT_QUANTITY, item.quantity - 1),
                        };
                    }
                    return item;
                }),
            };
        }

        case SET_QUANTITY: {
            const { productId, color, size, quantity } = action.payload;
            const safeQuantity = Math.max(DEFAULT_QUANTITY, quantity);
            return {
                ...state,
                items: state.items.map((item) => {
                    if (
                        item.productId === productId &&
                        item.color === color &&
                        item.size === size
                    ) {
                        return { ...item, quantity: safeQuantity };
                    }
                    return item;
                }),
            };
        }

        case REMOVE_ITEM: {
            const { productId, color, size } = action.payload;
            return {
                ...state,
                items: state.items.filter(
                    (item) =>
                        !(
                            item.productId === productId &&
                            item.color === color &&
                            item.size === size
                        )
                ),
            };
        }

        case CLEAR_CART:
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};
