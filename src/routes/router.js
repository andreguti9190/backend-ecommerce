import { Router } from "express";
import {signup} from "../controllers/signup.js";
import { login } from "../controllers/login.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;