import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { OrderStatus } from "@prisma/client";
import { OrderDTO } from "@shared/order";
import * as cartService from "./cartService";

/**
 * Get all orders (admin only)
 */
export const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    
    return orders;
  } catch (error) {
    logger.error("Error getting all orders:", error);
    throw error;
  }
};

/**
 * Get orders for a specific user
 */
export const getUserOrders = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    
    return orders;
  } catch (error) {
    logger.error(`Error getting orders for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    return order;
  } catch (error) {
    logger.error(`Error getting order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Create a new order from user's cart
 */
export const createOrderFromCart = async (userId: string) => {
  try {
    // Get user's cart
    const cart = await cartService.getOrCreateCart(userId);
    
    if (!cart.items || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }
    
    // Calculate total
    let total = 0;
    const orderItems = [];
    
    for (const item of cart.items) {
      // Get current product price
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });
      
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
      
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      orderItems.push({
        product: { connect: { id: item.productId } },
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }
    
    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    // Update product stock
    for (const item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }
    
    // Clear the cart
    await cartService.clearCart(userId);
    
    logger.info(`Created order ${order.id} for user ${userId}`);
    return order;
  } catch (error) {
    logger.error(`Error creating order for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    logger.info(`Updated order ${orderId} status to ${status}`);
    return updatedOrder;
  } catch (error) {
    logger.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
};

/**
 * Cancel order (can be done by user or admin)
 */
export const cancelOrder = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true
      }
    });
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    // Only allow cancellation if order is PENDING or PAID
    if (order.status !== "PENDING" && order.status !== "PAID") {
      throw new Error(`Cannot cancel order with status ${order.status}`);
    }
    
    // Update order status to CANCELLED
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    // Restore product stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });
    }
    
    logger.info(`Cancelled order ${orderId}`);
    return updatedOrder;
  } catch (error) {
    logger.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};