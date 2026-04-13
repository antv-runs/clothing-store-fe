import { useSyncExternalStore, useCallback } from "react";
import { cartStore } from "@/utils/cartStore";

export const useCart = () => {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Expose stable action references to avoid re-renders when passed as props
  const addItem = useCallback((...args: Parameters<typeof cartStore.addItem>) => cartStore.addItem(...args), []);
  const increaseQuantity = useCallback((...args: Parameters<typeof cartStore.increaseQuantity>) => cartStore.increaseQuantity(...args), []);
  const decreaseQuantity = useCallback((...args: Parameters<typeof cartStore.decreaseQuantity>) => cartStore.decreaseQuantity(...args), []);
  const setQuantity = useCallback((...args: Parameters<typeof cartStore.setQuantity>) => cartStore.setQuantity(...args), []);
  const removeItem = useCallback((...args: Parameters<typeof cartStore.removeItem>) => cartStore.removeItem(...args), []);
  const clearCart = useCallback((...args: Parameters<typeof cartStore.clearCart>) => cartStore.clearCart(...args), []);

  return {
    items,
    totalCount,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    removeItem,
    clearCart,
  };
};
