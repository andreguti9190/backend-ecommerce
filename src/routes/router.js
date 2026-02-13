import { Router } from "express";
import { login } from "../controllers/session/login.js";
import { signup } from "../controllers/session/signup.js"
import { auth } from "../controllers/validation/auth.js";
import createProduct from "../controllers/product/createproduct.js"
const router = Router();

router.post("/login", login);

router.post("/signup", signup)

router.post("/product", auth, createProduct)

export default router;