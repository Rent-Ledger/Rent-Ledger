import express from "express";
import maintenanceController from "../controllers/maintenance-Controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router();


//protect routes
router.get("/getMaintenance/:id",authMiddleware,maintenanceController.getMaintenanceById);
router.post("/submitMaintenanceRequest",authMiddleware,maintenanceController.submitMaintenanceRequest);
router.put("/handleMaintenance/:id",authMiddleware,maintenanceController.handleMaintenance);
router.delete("/deleteMaintenance/:id",authMiddleware,maintenanceController.deleteMaintenance);

export default router;