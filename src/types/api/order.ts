import type { ApiProduct } from "@/types/api/product";
import type { Product } from "@/types/product";

export interface CreateOrderRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
    color: string;
    size: string;
  }>;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: ApiOrder;
}

export interface ApiOrder {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string | null;
  total_amount: number;
  items: ApiOrderItem[];
  created_at: string;
}

export interface ApiOrderItem {
  id: number;
  product: ApiProduct;
  quantity: number;
  price: number;
  total: number;
  color: string;
  size: string;
}

export interface Order {
  id: number;
  userId: number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string | null;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  color: string;
  size: string;
}
