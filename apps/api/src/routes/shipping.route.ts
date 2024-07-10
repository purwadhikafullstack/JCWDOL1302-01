import { sendOrderController, getCitiesController, getCouriersController, getProvincesController, getSubdistrictsController } from "@/controllers/shipping.controller";
import { verifyToken } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/provinces", getProvincesController);
router.get("/cities", getCitiesController);
router.get("/subdistricts", getSubdistrictsController);
router.get("/couriers", getCouriersController);
router.patch("/send/:id", verifyToken, sendOrderController);

export default router;