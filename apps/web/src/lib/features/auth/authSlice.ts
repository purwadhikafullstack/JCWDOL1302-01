import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
  IUserPassword,
  IUserProfile,
  IUsers,
} from '@/interface/user.interface';
import parseJWT from '@/utils/parseJwt';
import instance from '@/utils/axiosInstance';
import {
  resetCartState,
  updateCartItemsState,
  updateCartStoreState,
} from '../cart/cartSlice';
import { getCartByUserID } from '@/services/cart.service';
import { toast } from 'react-toastify';

type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  isVerified?: boolean;
  role?: string;
  longitude?: number;
  latitude?: number;
  storeId?: string;
};

type Status = {
  isLogin: boolean;
  error?: string;
};

interface Auth {
  user: User;
  status: Status;
}

const initialState: Auth = {
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    birthDate: '',
    isVerified: false,
    role: '',
    longitude: undefined,
    latitude: undefined,
    storeId: '',
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    updateProfileState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
    },
    updateAvatarState: (state: Auth, action: PayloadAction<string>) => {
      state.user.image = action.payload;
    },
  },
});

export const signIn = (params: IUsers) => async (dispatch: Dispatch) => {
  try {
    const { email, password } = params;
    const location = JSON.parse(localStorage.getItem('location') || '{}');
    const { data } = await instance.post('/auth/login', {
      email,
      password,
      longitude: Number(location.longitude),
      latitude: Number(location.latitude),
    });
    const payload = await parseJWT(data?.data);
    const user = data?.data.user;
    dispatch(
      loginState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
        isVerified: user?.isVerified,
        role: user?.role.name,
        longitude: user?.longitude,
        latitude: user?.latitude,
        storeId: user?.userStores[0]?.storeId,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    const cart = await getCartByUserID(user.id);

    dispatch(
      updateCartItemsState({
        itemsCount: Number(cart?.cartItems?.length),
        itemsPrice: Number(cart?.itemsPrice),
        itemsDiscount: Number(cart?.itemsDiscount),
      }),
    );
    dispatch(
      updateCartStoreState({
        storeId: cart.storeId,
      }),
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(resetCartState());
    dispatch(logoutState());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastVisitedPage');
  } catch (err) {
    console.error(err);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    if (!token) throw new Error('Token not found');

    const { data } = await instance.get('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await parseJWT(data?.data);
    const user = data?.data.user;

    if (!user?.id) throw new Error('User not found');

    dispatch(
      tokenValidState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
        isVerified: user?.isVerified,
        role: user?.role.name,
        longitude: user?.longitude,
        latitude: user?.latitude,
        storeId: user?.userStores[0]?.storeId,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateProfile =
  (id: string, params: IUserProfile) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await instance.patch(
        `/users/${id}`,
        { ...params },
        config,
      );

      dispatch(updateProfileState({ ...params }));
      localStorage.setItem('user', JSON.stringify(data?.data));

      return data?.data;
    } catch (err: any) {
      console.error(err);
      return err.response.data.message;
    }
  };

export const updateAvatar =
  (id: string, formData: FormData) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await instance.patch(
        `/users/${id}/avatar`,
        formData,
        config,
      );
      const image = data?.data.image;

      dispatch(updateAvatarState(image));
      localStorage.setItem('user', JSON.stringify(data?.data));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

export const {
  loginState,
  logoutState,
  tokenValidState,
  updateProfileState,
  updateAvatarState,
} = authSlice.actions;

export default authSlice.reducer;
