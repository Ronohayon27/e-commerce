import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import logger from "../utils/logger";
import { UserSafeDTO } from "@shared/user";

/**
 * Get all users (admin only)
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return users;
  } catch (error) {
    logger.error("Error getting all users:", error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<UserSafeDTO> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    logger.error(`Error getting user ${userId}:`, error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUser = async (
  userId: string,
  data: { name?: string; email?: string }
): Promise<UserSafeDTO> => {
  try {
    // Check if email is being updated and if it's already in use
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (existingUser && existingUser.id !== userId) {
        throw new Error("Email already in use");
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return updatedUser;
  } catch (error) {
    logger.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

/**
 * Change user password
 */
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return true;
  } catch (error) {
    logger.error(`Error changing password for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (
  userId: string,
  role: "USER" | "ADMIN"
): Promise<UserSafeDTO> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return updatedUser;
  } catch (error) {
    logger.error(`Error updating role for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id: userId }
    });
    
    return true;
  } catch (error) {
    logger.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

/**
 * Get user's favorite products
 */
export const getFavoriteProducts = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: true
      }
    });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user.favorites;
  } catch (error) {
    logger.error(`Error getting favorite products for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Add product to user's favorites
 */
export const addToFavorites = async (userId: string, productId: string) => {
  try {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Add to favorites using the many-to-many relation
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: productId }
        }
      },
      include: {
        favorites: true
      }
    });
    
    logger.info(`Product ${productId} added to favorites for user ${userId}`);
    return product;
  } catch (error) {
    logger.error(`Error adding product ${productId} to favorites for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Remove product from user's favorites
 */
export const removeFromFavorites = async (userId: string, productId: string) => {
  try {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Remove from favorites using the many-to-many relation
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: productId }
        }
      }
    });
    
    logger.info(`Product ${productId} removed from favorites for user ${userId}`);
    return true;
  } catch (error) {
    logger.error(`Error removing product ${productId} from favorites for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Check if a product is in user's favorites
 */
export const isProductInFavorites = async (userId: string, productId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: {
          where: { id: productId },
          select: { id: true }
        }
      }
    });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user.favorites.length > 0;
  } catch (error) {
    logger.error(`Error checking if product ${productId} is in favorites for user ${userId}:`, error);
    throw error;
  }
};
