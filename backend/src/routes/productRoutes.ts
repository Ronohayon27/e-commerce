import Router from "express";
import {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";
import { validateIdParam, validateRequest } from "../middlewares/validationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { createProductSchema, updateProductSchema } from "../validators/productValidators";

const router = Router();

// Public routes - accessible to all users
router.get("/", getAllProducts);
router.get("/:id", validateIdParam("id"), getProductByID);

// Admin-only routes - protected by auth and admin middleware
router.post(
  "/", 
  authMiddleware,
  adminMiddleware,
  validateRequest(createProductSchema), 
  createProduct
);

router.put(
  "/:id", 
  authMiddleware, 
  adminMiddleware,
  validateIdParam("id"),
  validateRequest(updateProductSchema), 
  updateProduct
);

router.delete(
  "/:id", 
  authMiddleware, 
  adminMiddleware,
  validateIdParam("id"), 
  deleteProduct
);

export default router;
