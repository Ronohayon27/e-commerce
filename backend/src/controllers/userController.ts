import { Request, Response } from "express";
import logger from "../utils/logger";
import * as userService from "../services/userService";

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Error fetching all users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error fetching current user:", error);
    
    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

/**
 * Get user by ID (admin only)
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user ${req.params.id}:`, error);
    
    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * Update user profile
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Only allow name and email to be updated
    const { name, email } = req.body;
    const updateData: { name?: string; email?: string } = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Error updating user:", error);
    
    if (error instanceof Error && error.message === "Email already in use") {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

/**
 * Change user password
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }
    
    await userService.changePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    logger.error("Error changing password:", error);
    
    if (error instanceof Error) {
      if (error.message === "Current password is incorrect") {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      if (error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
    }
    
    res.status(500).json({ message: "Failed to change password" });
  }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (role !== "USER" && role !== "ADMIN") {
      return res.status(400).json({ message: "Invalid role" });
    }
    
    const updatedUser = await userService.updateUserRole(id, role);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Error updating role for user ${req.params.id}:`, error);
    
    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(500).json({ message: "Failed to update user role" });
  }
};

/**
 * Delete user (admin can delete any user, regular user can only delete themselves)
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;
    const userRole = req.user?.role;
    
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Regular users can only delete their own account
    if (userRole !== "ADMIN" && id !== currentUserId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own account" });
    }
    
    await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting user ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
