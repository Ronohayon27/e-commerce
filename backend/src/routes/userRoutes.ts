import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  changePassword,
  updateUserRole,
  deleteUser
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { validateRequest, validateIdParam } from "../middlewares/validationMiddleware";
import { updateUserSchema, changePasswordSchema, updateUserRoleSchema } from "../validators/userValidators";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Routes for regular users
router.get("/me", getCurrentUser);
router.put("/me", validateRequest(updateUserSchema), updateUser);
router.post("/change-password", validateRequest(changePasswordSchema), changePassword);
router.delete("/me", deleteUser);

// Admin-only routes
router.get("/", adminMiddleware, getAllUsers);
router.get("/:id", adminMiddleware, validateIdParam("id"), getUserById);
router.put("/:id/role", adminMiddleware, validateIdParam("id"), validateRequest(updateUserRoleSchema), updateUserRole);
router.delete("/:id", adminMiddleware, validateIdParam("id"), deleteUser);

export default router;
