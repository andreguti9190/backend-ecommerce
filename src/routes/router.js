import { Router } from "express";
import { login } from "../controllers/session/login.js";
import { signup } from "../controllers/session/signup.js"
import { logout } from "../controllers/session/logout.js"
import { auth } from "../controllers/validation/auth.js";
import createProduct from "../controllers/product/createProduct.js"
import category from "../controllers/product/category.js";
const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/product", auth, createProduct)

router.post("/category",category.create)

router.get("/category",category.get)


export default router;