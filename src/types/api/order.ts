/**
 * Order API types
 * Raw API request/response types for order endpoints
 */

export interface CreateOrderPayload {
  items: Array<{
    product_id: string | number;
    quantity: number;
  }>;
  customer_name: string;
  customer_email: string;
  address: string;
  phone?: string;
  [key: string]: unknown;
}

export interface OrderResponse {
  id: string | number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  address: string;
  phone?: string;
  items: Array<{
    product_id: string | number;
    quantity: number;
  }>;
  status: string;
  created_at: string;
  [key: string]: unknown;
}
