import express from "express";
import authController from "../Controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();


router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/resetPassword",authController.resetPassword);
router.post("/forgetPassword",authController.forgetPassword);
router.post("/deactive/:id",authMiddleware,authController.deactivationAccount);

router.get("/getData",authController.getData);
export default router;