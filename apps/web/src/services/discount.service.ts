import { IFilterDiscount } from '@/interface/discount.interface';
import instance from '@/utils/axiosInstance';

export const getDiscounts = async ({
  storeId = '',
  keyword = '',
  page = 1,
  size = 10,
}: IFilterDiscount) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/discounts?storeId=${storeId}&keyword=${keyword}&page=${page}&size=${size}`,
      config,
    );
    const discounts = data?.data;
    return discounts;
  } catch (err) {
    console.error(err);
  }
};

export const createDiscount = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/discounts', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const getDiscountsByStoreID = async (
  storeId: string,
  { keyword = '', page = 1, size = 10 }: IFilterDiscount,
) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/discounts/store/${storeId}?keyword=${keyword}&page=${page}&size=${size}`,
      config,
    );
    const discounts = data?.data;
    return discounts;
  } catch (err) {
    console.error(err);
  }
};

export const getDiscountByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/discounts/${id}`, config);
    const discount = data?.data;
    return discount;
  } catch (err) {
    console.error(err);
  }
};

export const getDiscountByProductIdAndStoreId = async (
  productId: string,
  storeId: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/discounts/product/${productId}/store/${storeId}`,
      config,
    );
    const discount = data?.data;
    return discount;
  } catch (err) {
    console.error(err);
  }
};

export const updateDiscount = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/discounts/${id}`, formData, config);
    const discount = data?.data;
    return discount;
  } catch (err) {
    console.error(err);
  }
};

export const deleteDiscount = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/discounts/${id}`, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};
