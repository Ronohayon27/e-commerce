import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  image: z.url("Image must be a valid URL"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer")
});

export const updateProductSchema = createProductSchema.partial();
