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
  const response = await post<CreateOrderResponse>("/api/orders", payload);

  if (!response.success) {
    throw new Error(response.message || "Failed to create order");
  }

  const orderData = unwrapApiResponse<ApiOrder>(
    response,
    "Failed to create order",
  );
  return mapApiOrderToOrder(orderData);
}
