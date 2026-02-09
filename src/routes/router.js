import { Router } from "express";
import {signup} from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { createProduct, deleteProduct } from "../controllers/product.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/product",createProduct)
router.delete("/product",deleteProduct)

export default router;