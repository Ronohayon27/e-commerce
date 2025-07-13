import { Request, Response } from "express";
import * as orderService from "../services/orderService";
import logger from "../utils/logger";
import { OrderStatus } from "@prisma/client";

/**
 * Get all orders (admin only)
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    logger.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * Get orders for the current user
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const orders = await orderService.getUserOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    logger.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const order = await orderService.getOrderById(id);
    
    // Regular users can only view their own orders
    if (userRole !== "ADMIN" && order.userId !== userId) {
      return res.status(403).json({ message: "Forbidden: You can only view your own orders" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Error fetching order ${req.params.id}:`, error);
    
    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

/**
 * Create a new order from user's cart
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const order = await orderService.createOrderFromCart(userId);
    res.status(201).json(order);
  } catch (error) {
    logger.error("Error creating order:", error);
    
    if (error instanceof Error) {
      if (error.message === "Cart is empty") {
        return res.status(400).json({ message: "Cart is empty" });
      }
      if (error.message.includes("Not enough stock")) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message.includes("Product") && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
    }
    
    res.status(500).json({ message: "Failed to create order" });
  }
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    
    const updatedOrder = await orderService.updateOrderStatus(id, status as OrderStatus);
    res.status(200).json(updatedOrder);
  } catch (error) {
    logger.error(`Error updating order ${req.params.id} status:`, error);
    
    if (error instanceof Error && error.message === "Order not found") {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(500).json({ message: "Failed to update order status" });
  }
};

/**
 * Cancel order
 */
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Check if user owns this order or is admin
    if (userRole !== "ADMIN") {
      const order = await orderService.getOrderById(id);
      if (order.userId !== userId) {
        return res.status(403).json({ message: "Forbidden: You can only cancel your own orders" });
      }
    }
    
    const cancelledOrder = await orderService.cancelOrder(id);
    res.status(200).json(cancelledOrder);
  } catch (error) {
    logger.error(`Error cancelling order ${req.params.id}:`, error);
    
    if (error instanceof Error) {
      if (error.message === "Order not found") {
        return res.status(404).json({ message: "Order not found" });
      }
      if (error.message.includes("Cannot cancel order with status")) {
        return res.status(400).json({ message: error.message });
      }
    }
    
    res.status(500).json({ message: "Failed to cancel order" });
  }
};