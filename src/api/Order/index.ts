// Order API module
// Moved from services/orderService.ts

import { post } from "@/lib/axios";
import type { ApiResponse } from "@/types/pagination";
import type { CreateOrderPayload, OrderResponse } from "@/types/api/order";
import { unwrapApiResponse } from "@/utils/apiHelpers";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<OrderResponse> {
  const res = await post<ApiResponse<OrderResponse>>("/api/orders", payload);
  return unwrapApiResponse(res, "Failed to create order");
}
