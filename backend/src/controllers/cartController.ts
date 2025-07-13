import { Request, Response } from "express";
import logger from "../utils/logger";
import * as cartService from "../services/cartService";

/**
 * Get the user's cart or create one if it doesn't exist
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    logger.info("getCart was called");
    const userId = req.user?.id; // Assuming user is attached by auth middleware
    if (!userId){
      return
    }
    const cart = await cartService.getOrCreateCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    logger.error("Error getting cart:", error);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

/**
 * Add a product to the user's cart
 */
export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId){
      return
    }
    const { productId, quantity } = req.body;
    
    const cartItem = await cartService.addProductToCart(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    logger.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

/**
 * Update the quantity of a product in the cart
 */
export const updateProductInCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId){
      return
    }
    const { id } = req.params; // Cart item ID
    const { quantity } = req.body;
    
    const updatedItem = await cartService.updateProductInCart(userId, id, quantity);
    res.status(200).json(updatedItem);
  } catch (error) {
    logger.error("Error updating product in cart:", error);
    
    if (error === "Cart item not found") {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.status(500).json({ message: "Failed to update product in cart" });
  }
};

/**
 * Delete a product from the cart
 */
export const deleteProductFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId){
      return
    }
    const { id } = req.params; // Cart item ID
    
    await cartService.deleteProductFromCart(userId, id);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    logger.error("Error deleting product from cart:", error);
    
    if (error === "Cart item not found") {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.status(500).json({ message: "Failed to delete product from cart" });
  }
};

/**
 * Clear all items from the cart
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId){
      return
    }
    
    await cartService.clearCart(userId);
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    logger.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
