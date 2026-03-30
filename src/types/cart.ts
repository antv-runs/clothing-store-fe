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
