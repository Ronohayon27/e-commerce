import prisma from "../utils/prisma";
import logger from "../utils/logger";

/**
 * Get or create a cart for a user
 */
export const getOrCreateCart = async (userId: string) => {
  try {
    // Try to find an existing cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // If no cart exists, create one
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {}
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
      logger.info(`Created new cart for user ${userId}`);
    }

    return cart;
  } catch (error) {
    logger.error(`Error getting/creating cart for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Add a product to the user's cart
 */
export const addProductToCart = async (userId: string, productId: string, quantity: number) => {
  try {
    // Get or create the cart
    const cart = await getOrCreateCart(userId);

    // Check if the product already exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId
      }
    });

    if (existingItem) {
      // Update the quantity if the product already exists
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true }
      });
      logger.info(`Updated quantity for product ${productId} in cart ${cart.id}`);
      return updatedItem;
    } else {
      // Add the product to the cart if it doesn't exist
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        },
        include: { product: true }
      });
      logger.info(`Added product ${productId} to cart ${cart.id}`);
      return newItem;
    }
  } catch (error) {
    logger.error(`Error adding product ${productId} to cart for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Update the quantity of a product in the cart
 */
export const updateProductInCart = async (userId: string, cartItemId: string, quantity: number) => {
  try {
    // Ensure the cart exists
    const cart = await getOrCreateCart(userId);

    // Verify the cart item belongs to this user's cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cartId: cart.id
      }
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Update the cart item quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true }
    });

    logger.info(`Updated cart item ${cartItemId} quantity to ${quantity}`);
    return updatedItem;
  } catch (error) {
    logger.error(`Error updating cart item ${cartItemId} for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Delete a product from the cart
 */
export const deleteProductFromCart = async (userId: string, cartItemId: string) => {
  try {
    // Ensure the cart exists
    const cart = await getOrCreateCart(userId);

    // Verify the cart item belongs to this user's cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cartId: cart.id
      }
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    logger.info(`Deleted cart item ${cartItemId} from cart ${cart.id}`);
    return { success: true };
  } catch (error) {
    logger.error(`Error deleting cart item ${cartItemId} for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Clear all items from the cart
 */
export const clearCart = async (userId: string) => {
  try {
    // Ensure the cart exists
    const cart = await getOrCreateCart(userId);

    // Delete all items in the cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    logger.info(`Cleared all items from cart ${cart.id}`);
    return { success: true };
  } catch (error) {
    logger.error(`Error clearing cart for user ${userId}:`, error);
    throw error;
  }
};
