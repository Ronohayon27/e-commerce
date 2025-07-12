import Router from "express";
import {
  getAllProducts,
  getProductByID,
} from "../controllers/productController";
import { validateIdParam } from "../middlewares/validateIdParam";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validateIdParam("id"), getProductByID);

export default router;
