import { IFilterProduct } from '@/interface/product.interface';
import instance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

export const getProducts = async ({
  category = '',
  keyword = '',
  page = 1,
  size = 10,
}: IFilterProduct) => {
  try {
    const { data } = await instance.get(
      `/products?keyword=${keyword}&page=${page}&size=${size}&category=${category}`,
    );
    const products = data?.data;
    return products;
  } catch (err) {
    console.error(err);
  }
};

export const getAvailableProductsByStoreID = async ({
  storeId = '',
  category = '',
  keyword = '',
  page = 1,
  size = 10,
}: IFilterProduct) => {
  try {
    const { data } = await instance.get(
      `/products/store?storeId=${storeId}&keyword=${keyword}&page=${page}&size=${size}&category=${category}`,
    );
    const products = data?.data;
    return products;
  } catch (err) {
    console.error(err);
  }
};

export const getProductByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await instance.get(`/products/slug/${slug}`);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const createProduct = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/products', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/products/${id}`, formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/products/${id}`, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const createProductImage = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await instance.post(`/products/image`, formData, config);

    const productImage = data?.data;
    return productImage;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProductImage = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/products/image/${id}`, config);
    const productImage = data?.data;
    return productImage;
  } catch (err) {
    console.error(err);
  }
};
