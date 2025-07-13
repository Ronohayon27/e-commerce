import { Router } from "express";
import {
  validateRequest,
  validateIdParam,
} from "../middlewares/validationMiddleware";
import {
  addCartItemSchema,
  updateCartItemSchema,
} from "../validators/cartValidators";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  clearCart
} from "../controllers/cartController";

const router = Router();

router.use(authMiddleware);
router.get("/", getCart);
router.post("/", validateRequest(addCartItemSchema), addProductToCart);
router.delete("/", clearCart);
router.put("/item/:id", validateRequest(updateCartItemSchema), updateProductInCart);
router.delete("/item/:id", validateIdParam("id"), deleteProductFromCart);

export default router;
