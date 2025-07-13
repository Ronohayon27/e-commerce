import { Request, Response } from "express";
import logger from "../utils/logger";
import * as productService from "../services/productService";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
    logger.info("Products fetched successfully");
  } catch (error) {
    logger.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductByID(id);
    res.status(200).json(product);
    logger.info("Product fetched successfully");
  } catch (error) {
    logger.error("Error fetching product:", error);
    
    if (error instanceof Error && error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/**
 * Create a new product (admin only)
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    logger.info(`Product created: ${product.id}`);
    res.status(201).json(product);
  } catch (error) {
    logger.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

/**
 * Update an existing product (admin only)
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    logger.info(`Updating product ${id}`);
    const updatedProduct = await productService.updateProduct(id, updateData);
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error("Error updating product:", error);
    
    if (error instanceof Error && error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(500).json({ message: "Failed to update product" });
  }
};

/**
 * Delete a product (admin only)
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await productService.deleteProduct(id);
    
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error("Error deleting product:", error);
    
    if (error instanceof Error && error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(500).json({ message: "Failed to delete product" });
  }
};
