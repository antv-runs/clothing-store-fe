// Order API module
// Moved from services/orderService.ts

import { post } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import { unwrapApiResponse } from "@/utils/apiHelpers";

export interface CreateOrderPayload {
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
