/**
 * Cart domain types
 * Frontend-only types for cart functionality
 */

export interface CartRow {
  productId: string;
  quantity: number;
  color: string | null;
  size: string | null;
}

/**
 * Cart item shape that may come from persisted storage.
 * Supports both legacy `id` and current `productId` keys.
 */
export interface CartStorageRow {
  id?: string | number;
  productId?: string | number;
  product_id?: string | number;
  quantity?: number;
  color?: string | null;
  size?: string | null;
}
