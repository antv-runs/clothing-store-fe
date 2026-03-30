import { post } from "./httpClient";
import type { ApiResponse } from "@custom-types/api";
import { unwrapApiResponse } from "./apiHelpers";

export interface CreateOrderPayload {
  // Define the order payload fields as per backend API
  // Example fields:
  items: Array<{
    product_id: string | number;
    quantity: number;
  }>;
  customer_name: string;
  customer_email: string;
  address: string;
  phone?: string;
  [key: string]: any;
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
  [key: string]: any;
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<OrderResponse> {
  const res = await post<ApiResponse<OrderResponse>>("/api/orders", payload);
  return unwrapApiResponse(res, "Failed to create order");
}
