import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
});
