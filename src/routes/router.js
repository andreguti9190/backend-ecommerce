import { Router } from "express";
import { auth } from "../controllers/validation/auth.js";
import { login } from "../controllers/Auth/login.js";
import { signup } from "../controllers/Auth/signup.js"
import { logout } from "../controllers/Auth/logout.js"
import product from "../controllers/product/product.js"
import category from "../controllers/product/category.js";
const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/category", category.create)

router.get("/category", category.get)

router.get("/product", product.get)

router.post("/product", auth, product.create)

export default router;