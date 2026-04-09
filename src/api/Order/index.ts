import { post } from "@/lib/axios";
import { mapApiOrderToOrder } from "@/utils/orderMapper";
import { unwrapApiResponse } from "@/utils/apiHelpers";
import type {
  ApiOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
} from "@/types/api/order";

export async function createOrder(payload: CreateOrderRequest): Promise<Order> {
  // const url = "/api/orders";

  // Simulate a server error for testing error handling
  const url = `https://httpbin.org/status/500`;

  const response = await post<CreateOrderResponse>(url, payload);

  if (!response.success) {
    throw new Error(response.message || "Failed to create order");
  }

  const orderData = unwrapApiResponse<ApiOrder>(
    response,
    "Failed to create order",
  );
  return mapApiOrderToOrder(orderData);
}
