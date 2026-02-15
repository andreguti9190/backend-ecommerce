import { Router } from "express";
import { login } from "../controllers/session/login.js";
import { signup } from "../controllers/session/signup.js"
import { logout } from "../controllers/session/logout.js"
import { auth } from "../controllers/validation/auth.js";
import product from "../controllers/product/product.js"
import category from "../controllers/product/category.js";
const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/category",category.create)

router.get("/category",category.get)

router.post("/product", auth, product.create)

export default router;