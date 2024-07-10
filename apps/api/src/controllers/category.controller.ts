import { Request, Response, NextFunction } from "express";
import { createCategoryAction, deleteCategoryAction, getCategoryByIDAction, getCategoriesAction, updateCategoryAction } from "../actions/category.action";

const getCategoriesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getCategoriesAction(filters);

    res.status(200).json({
      message: "Get categories success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getCategoryByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getCategoryByIDAction(id);

    res.status(200).json({
      message: "Get category success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const createCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await createCategoryAction(req.body);

    res.status(200).json({
      message: "Create category success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const updateCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await updateCategoryAction(id, req.body);

    res.status(200).json({
      message: "Update category success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const deleteCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteCategoryAction(id);

    res.status(200).json({
      message: "Delete category success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  getCategoriesController,
  getCategoryByIDController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
}
