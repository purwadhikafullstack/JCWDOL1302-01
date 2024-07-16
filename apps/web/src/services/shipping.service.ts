import instance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const getProvinces = async () => {
  try {
    const { data } = await instance.get('/shipping/provinces');
    const provinces = data?.data;
    return provinces;
  } catch (err) {
    console.error(err);
  }
};

export const getCities = async (provinceId: string) => {
  try {
    const { data } = await instance.get(`/shipping/cities?provinceId=${provinceId}`);
    const cities = data?.data;
    return cities;
  } catch (err) {
    console.error(err);
  }
};

export const getSubdistricts = async (cityId: string) => {
  try {
    const { data } = await instance.get(`/shipping/subdistricts?cityId=${cityId}`);
    const subdistricts = data?.data;
    return subdistricts;
  } catch (err) {
    console.error(err);
  }
};

export const getCouriers = async (origin: string, destination: string) => {
  try {
    const { data } = await instance.get(`/shipping/couriers?origin=${origin}&destination=${destination}`);
    const couriers = data?.data;
    return couriers;
  } catch (err) {
    console.error(err);
  }
};

export const sendOrder = async (orderId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(
      `/shipping/send/${orderId}`,
      {},
      config,
    );
    const order = data?.data;
    return order;
  } catch (err) {
    console.error(err);
    toast.error('Send order failed');
  }
};