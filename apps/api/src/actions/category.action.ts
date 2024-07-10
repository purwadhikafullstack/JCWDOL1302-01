import { Category } from "@prisma/client";
import { createCategoryQuery, deleteCategoryQuery, getCategoryByIDQuery, getCategoryBySlugOrNameQuery, getCategoriesQuery, updateCategoryQuery } from "../queries/category.query";
import { HttpException } from "../exceptions/HttpException";
import { ICategory, IFilterCategory, IResultCategory } from "../interfaces/category.interface";

const getCategoriesAction = async (filters: IFilterCategory): Promise<IResultCategory> => {
  try {
    const data = await getCategoriesQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
}

const getCategoryByIDAction = async (id: string): Promise<Category | null> => {
  try {
    const category = await getCategoryByIDQuery(id);

    if (!category) throw new HttpException(404, "Data not found");

    return category;
  } catch (err) {
    throw err;
  }
}

const createCategoryAction = async (categoryData: ICategory): Promise<Category> => {
  try {
    const existCategory = await getCategoryBySlugOrNameQuery(categoryData.slug, categoryData.name);

    if (existCategory) throw new Error("Category already exists");

    const category = await createCategoryQuery(categoryData);
    return category;
  } catch (err) {
    throw err;
  }
}

const updateCategoryAction = async (
  id: string,
  categoryData: ICategory
): Promise<Category> => {
  try {
    const category = await updateCategoryQuery(id, categoryData);
    return category;
  } catch (err) {
    throw err;
  }
}

const deleteCategoryAction = async (id: string): Promise<Category> => {
  try {
    const category = await deleteCategoryQuery(id);
    return category;
  } catch (err) {
    throw err;
  }
}

export {
  getCategoriesAction,
  getCategoryByIDAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
}