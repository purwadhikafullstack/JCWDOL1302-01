import instance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

export const createPayment = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/payment', formData, config);
    const payment = data?.data;
    return payment;
  } catch (err) {
    console.error(err);
  }
};

export const updatePaymentStatus = async (orderId: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(
      `/payment/status/${orderId}`,
      formData,
      config,
    );
    const order = data?.data;
    return order;
  } catch (err) {
    console.error(err);
  }
};

export const confirmPayment = async (orderId: string, formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await instance.patch(
      `/payment/confirm/${orderId}`,
      formData,
      config,
    );
    const order = data?.data;
    return order;
  } catch (err) {
    console.error(err);
  }
};
