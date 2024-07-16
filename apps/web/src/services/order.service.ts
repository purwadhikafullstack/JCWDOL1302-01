import { IFilterOrder } from "@/interface/order.interface";
import instance from '@/utils/axiosInstance';

export const getOrders = async (props: IFilterOrder) => {
  const {
    userId = "",
    storeId = "",
    startDate = "",
    endDate = "",
    orderStatus = "",
    keyword = "",
    page = 1,
    size = 10
  } = props;

  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.get(`/orders?userId=${userId}&storeId=${storeId}&startDate=${startDate}&endDate=${endDate}&orderStatus=${orderStatus}&keyword=${keyword}&page=${page}&size=${size}`, config);
    const orders = data?.data;
    return orders;
  } catch (err) {
    console.error(err);
  }
};

export const getOrderByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.get(`/orders/${id}`, config);
    const order = data?.data;
    return order;
  } catch (err) {
    console.error(err);
  }
};

export const createOrder = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/orders', formData, config);
    const order = data?.data;
    return order;
  } catch (err) {
    console.error(err);
  }
};
