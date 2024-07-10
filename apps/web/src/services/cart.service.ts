import instance from '@/utils/axiosInstance';

export const getCartByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/cart/${id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const getCartByUserID = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/cart/user/${userId}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const createCartItem = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/cart/item', formData, config);
    const cartItem = data?.data;
    return cartItem;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/cart/item/${id}`, config);
    const cartItem = data?.data;
    return cartItem;
  } catch (err) {
    console.error(err);
  }
};

export const updateCart = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/cart/${id}`, formData, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCart = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/cart/${id}`, config);
    const cart = data?.data;
    return cart;
  } catch (err) {
    console.error(err);
  }
};

export const resetCartItems = async (cartId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.delete(`/cart/items/${cartId}`, config);
    return true;
  } catch (err) {
    console.error(err);
  }
};
