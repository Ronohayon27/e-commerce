import { Router } from "express";
import {
  getAllOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder
} from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { validateRequest, validateIdParam } from "../middlewares/validationMiddleware";
import { updateOrderStatusSchema } from "../validators/orderValidators";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// User order routes
router.get("/my-orders", getUserOrders);
router.get("/my-orders/:id", validateIdParam("id"), getOrderById);
router.post("/create", createOrder);
router.post("/:id/cancel", validateIdParam("id"), cancelOrder);

// Admin-only routes
router.get("/", adminMiddleware, getAllOrders);
router.put("/:id/status", adminMiddleware, validateIdParam("id"), validateRequest(updateOrderStatusSchema), updateOrderStatus);

export default router;
