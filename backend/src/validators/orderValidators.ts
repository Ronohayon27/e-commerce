import { z } from "zod";
import { OrderStatus } from "@prisma/client";

/**
 * Validator for updating order status
 */
export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "CANCELLED", "DELIVERED"] as [string, ...string[]]),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
