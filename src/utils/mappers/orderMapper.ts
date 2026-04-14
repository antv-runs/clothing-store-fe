import type { CartRow } from "@/types/cart";
import type { CheckoutFormValues } from "@/components/organisms/CheckoutForm/index.schema";
import { mapApiProductToProduct } from "@/utils/mappers/productMapper";
import type {
  ApiOrder,
  ApiOrderItem,
  CreateOrderRequest,
  Order,
  OrderItem,
} from "@/types/api/order";

const normalizeQuantity = (value: number, index: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error(`Invalid quantity for cart item #${index + 1}.`);
  }

  return Math.floor(parsed);
};

const normalizeProductId = (value: string | number, index: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid product selected in cart item #${index + 1}.`);
  }

  return parsed;
};

const normalizeRequiredText = (
  value: string | null | undefined,
  field: "phone" | "color" | "size",
  index?: number,
): string => {
  const normalized = String(value ?? "").trim();
  if (!normalized) {
    if (typeof index === "number") {
      throw new Error(`Missing ${field} for cart item #${index + 1}.`);
    }

    throw new Error(`Please provide ${field} before placing your order.`);
  }

  return normalized;
};

export const mapApiOrderItemToOrderItem = (item: ApiOrderItem): OrderItem => {
  return {
    id: item.id,
    product: mapApiProductToProduct(item.product),
    quantity: item.quantity,
    price: item.price,
    total: item.total,
    color: item.color,
    size: item.size,
  };
};

export const mapApiOrderToOrder = (order: ApiOrder): Order => {
  return {
    id: order.id,
    userId: order.user_id,
    name: order.name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    status: order.status,
    totalAmount: order.total_amount,
    items: order.items.map(mapApiOrderItemToOrderItem),
    createdAt: order.created_at,
  };
};

export const mapCartToOrderRequest = (
  cartRows: CartRow[],
  customer: CheckoutFormValues,
): CreateOrderRequest => {
  const phone = normalizeRequiredText(customer.phone, "phone");

  return {
    customer: {
      name: customer.fullName,
      email: customer.email,
      phone,
      address: customer.address,
    },
    items: cartRows.map((row, index) => ({
      product_id: normalizeProductId(row.productId, index),
      quantity: normalizeQuantity(row.quantity, index),
      color: normalizeRequiredText(row.color, "color", index),
      size: normalizeRequiredText(row.size, "size", index),
    })),
  };
};

