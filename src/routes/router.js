import { Router } from "express";
import { login } from "../controllers/session/login.js";
import { signup } from "../controllers/session/signup.js"
const router = Router();

router.post("/login", login);
router.post("/signup", signup)

export default router;