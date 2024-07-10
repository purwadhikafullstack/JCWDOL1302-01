import { IFilterCategory } from "@/interface/category.interface";
import instance from "@/utils/axiosInstance";

export const getCategories = async ({ keyword = "", page = 1, size = 10 }: IFilterCategory) => {
  try {
    const { data } = await instance.get(`/categories?keyword=${keyword}&page=${page}&size=${size}`);
    const categories = data?.data;
    return categories;
  } catch (err) {
    console.error(err);
  }
};

export const getCategoryByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    const category = data?.data;
    return category;
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.post('/categories', formData, config);
    const category = data?.data;
    return category;
  } catch (err) {
    console.error(err);
  }
};

export const updateCategory = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.patch(`/categories/${id}`, formData, config);
    const category = data?.data;
    return category;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.delete(`/categories/${id}`, config);
    const category = data?.data;
    return category;
  } catch (err) {
    console.error(err);
  }
};