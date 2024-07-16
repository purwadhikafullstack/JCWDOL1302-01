import { IFilterStore, IUserLocation } from '@/interface/store.interface';
import instance from '@/utils/axiosInstance';

export const getStores = async ({
  keyword = '',
  page = 1,
  size = 1000,
}: IFilterStore) => {
  try {
    const { data } = await instance.get(
      `/stores?keyword=${keyword}&page=${page}&size=${size}`,
    );
    const stores = data?.data;
    return stores;
  } catch (err) {
    console.error(err);
  }
};

export const getStoreByID = async (id: string) => {
  try {
    const { data } = await instance.get(`/stores/${id}`);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const getUnassignedUsersByStoreID = async (storeId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/stores/users/unassigned/${storeId}`,
      config,
    );
    const users = data?.data;
    return users;
  } catch (err) {
    console.error(err);
  }
};

export const getDistanceStores = async (userLocation: IUserLocation) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post(
      `/stores/distance`,
      userLocation,
      config,
    );
    const stores = data?.data;
    return stores;
  } catch (err) {
    console.error(err);
  }
};

export const getNearestStore = async (userLocation: IUserLocation) => {
  try {
    const { data } = await instance.post(`/stores/nearest`, userLocation);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const createStore = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/stores', formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const updateStore = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/stores/${id}`, formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const deleteStore = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/stores/${id}`, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const createUserStore = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/stores/users', formData, config);
    const userStore = data?.data;
    return userStore;
  } catch (err) {
    console.error(err);
  }
};

export const getUsersByStoreID = async (storeId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`stores/users/${storeId}`, config);
    const userStore = data?.data;
    return userStore;
  } catch (err) {
    console.error(err);
  }
};

export const getUserStores = async (storeId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/stores/users/assigned/${storeId}`,
      config,
    );
    const userStore = data?.data;
    return userStore;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserStore = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/stores/users/${id}`, config);
    const userStore = data?.data;
    return userStore;
  } catch (err) {
    console.error(err);
  }
};

export const updateUserStore = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/users/${id}`, formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};
