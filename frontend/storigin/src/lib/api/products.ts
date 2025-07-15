import axios from "@/lib/api/axios";
import { ProductDTO } from "../../../../../shared/types/product";

export const getAllProducts = async (): Promise<ProductDTO[]> => {
  const res = await axios.get("/products");
  return res.data;
};

export async function getProductById(id: string): Promise<ProductDTO> {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}
