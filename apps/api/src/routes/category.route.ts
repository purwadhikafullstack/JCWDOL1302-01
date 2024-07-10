import express from "express";
import { createCategoryController, deleteCategoryController, getCategoryByIDController, getCategoriesController, updateCategoryController } from "../controllers/category.controller";
import { superAdminGuard, verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIDController);
router.post("/", verifyToken, superAdminGuard, createCategoryController);
router.patch("/:id", verifyToken, superAdminGuard, updateCategoryController);
router.delete("/:id", verifyToken, superAdminGuard, deleteCategoryController);

export default router;