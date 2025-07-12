import { ProductDTO } from "./product";

export type OrderItemDTO = {
  id: string;
  product: ProductDTO;
  quantity: number;
  priceAtPurchase: number;
};

export type OrderDTO = {
  id: string;
  userId: string;
  items: OrderItemDTO[];
  total: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED" | "DELIVERED";
  createdAt: string;
};
