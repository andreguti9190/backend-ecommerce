import { Router } from "express";
import { sesion } from "../middleware/session.js";
import {signup} from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { createProduct, deleteProduct } from "../controllers/product.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/product",sesion,createProduct)
router.delete("/product",sesion,deleteProduct)

export default router;