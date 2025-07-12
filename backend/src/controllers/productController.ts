import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
    logger.info("products fetched successfully");
  } catch (error) {
    res.status(500).json({ message: "failed to fetch products" });
  }
};
export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
    logger.info("Product fetched successfully");
  } catch (error) {
    logger.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
