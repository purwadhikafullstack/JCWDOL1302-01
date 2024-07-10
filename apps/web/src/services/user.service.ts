import { IUserPassword, IFilterUser } from '@/interface/user.interface';
import instance from '@/utils/axiosInstance';

export const updatePassword = async (id: string, params: IUserPassword) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(
      `/users/${id}/password`,
      { ...params },
      config,
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const getUsers = async ({
  keyword = '',
  page = 1,
  size = 10,
}: IFilterUser) => {
  try {
    const { data } = await instance.get(
      `/users?keyword=${keyword}&page=${page}&size=${size}`,
    );
    const users = data?.data;
    return users;
  } catch (err) {
    console.error(err);
  }
};

export const getUserByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/users/${id}`);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/users', formData, config);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/users/${id}`, formData, config);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/users/${id}`, config);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};
