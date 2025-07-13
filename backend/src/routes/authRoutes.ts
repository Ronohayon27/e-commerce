import { Router } from "express";
import { login, signUp, getMe } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validationMiddleware";
import { signupSchema, loginSchema } from "../validators/authValidators";

const router = Router();

router.post("/signup", validateRequest(signupSchema), signUp);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", authMiddleware, getMe);

export default router;
