import { ProductDTO } from "./product";

export type CartItemDTO = {
  id: string;
  product: ProductDTO;
  quantity: number;
};

export type CartDTO = {
  id: string;
  userId: string;
  items: CartItemDTO[];
};
