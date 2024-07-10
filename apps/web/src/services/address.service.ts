import { IFilterAddress } from "@/interface/address.interface";
import instance from "@/utils/axiosInstance";

export const getAddresses = async ({ userId = "", keyword = "", page = 1, size = 10 }: IFilterAddress) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.get(`/addresses?userId=${userId}&keyword=${keyword}&page=${page}&size=${size}`, config);
    const addresses = data?.data;
    return addresses;
  } catch (err) {
    console.error(err);
  }
};

export const getAddressByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.get(`/addresses/${id}`, config);
    const address = data?.data;
    return address;
  } catch (err) {
    console.error(err);
  }
};

export const createAddress = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.post('/addresses', formData, config);
    const address = data?.data;
    return address;
  } catch (err) {
    console.error(err);
  }
};

export const updateAddress = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.patch(`/addresses/${id}`, formData, config);
    const address = data?.data;
    return address;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await instance.delete(`/addresses/${id}`, config);
    const address = data?.data;
    return address;
  } catch (err) {
    console.error(err);
  }
};