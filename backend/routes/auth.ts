import { Router } from "express";
import * as authController from "../controllers/auth";

const router: Router = Router();

router.post("/otp", authController.sendOtp);
router.post("/login", authController.loginWithOtp);

export default router;

