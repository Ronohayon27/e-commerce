import prisma from "../utils/prisma";
import logger from "../utils/logger";
import { Prisma } from "@prisma/client";

type ProductCreateInput = Prisma.ProductCreateInput;
type ProductUpdateInput = Prisma.ProductUpdateInput;

/**
 * Get all products
 */
export const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        logger.error("Error fetching all products:", error);
        throw error;
    }
}


/**
 * Get product by ID
 */
export const getProductByID = async (productID: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productID }
        });
        
        if (!product) {
            throw new Error("Product not found");
        }
        
        return product;
    } catch (error) {
        logger.error(`Error fetching product ${productID}:`, error);
        throw error;
    }
}

/**
 * Create a new product
 */
export const createProduct = async (productData: ProductCreateInput) => {
    try {
        const product = await prisma.product.create({
            data: productData
        });
        
        logger.info(`Product created with ID: ${product.id}`);
        return product;
    } catch (error) {
        logger.error("Error creating product:", error);
        throw error;
    }
}

/**
 * Update an existing product
 */
export const updateProduct = async (productId: string, updateData: ProductUpdateInput) => {
    try {
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: updateData
        });

        logger.info(`Product updated: ${productId}`);
        return updatedProduct;
    } catch (error) {
        logger.error(`Error updating product ${productId}:`, error);
        throw error;
    }
}

/**
 * Delete a product
 */
export const deleteProduct = async (productId: string) => {
    try {
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Delete the product
        await prisma.product.delete({
            where: { id: productId }
        });

        logger.info(`Product deleted: ${productId}`);
        return true;
    } catch (error) {
        logger.error(`Error deleting product ${productId}:`, error);
        throw error;
    }
}
