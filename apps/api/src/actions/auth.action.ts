import { User } from 'prisma/prisma-client';
import { Auth, RegisterAuth } from '../interfaces/auth.interface';
import { getUserByEmailQuery, updateUserQuery } from '../queries/user.query';
import {
  forgotPasswordQuery,
  loginQuery,
  registerQuery,
  verifyQuery,
} from '../queries/auth.query';
import { HttpException } from '../exceptions/HttpException';
import { genSalt, hash, compare } from 'bcrypt';
import { API_KEY } from '../config';
import { sign } from 'jsonwebtoken';
import { createCartQuery, getCartByUserIDQuery } from '@/queries/cart.query';
import { getStoresQuery } from '@/queries/store.query';
import { getNearestStore } from '@/utils/store.util';

const registerAction = async (data: RegisterAuth): Promise<User> => {
  try {
    const check = await getUserByEmailQuery(data.email || '');
    if (check) throw new Error('User already exist');

    const user = await registerQuery(data);

    // create referral code voucher

    return user;
  } catch (err) {
    throw err;
  }
};

const loginAction = async (data: Auth) => {
  try {
    const user = await getUserByEmailQuery(data.email);
    if (!user) throw new Error('email doesnt exist');

    const isValid = await compare(data.password, user.password || '');
    if (!isValid) throw new Error('password is wrong');

    const userLocation = {
      longitude: data.longitude,
      latitude: data.latitude,
    };

    await updateUserQuery(user.id, userLocation);

    const cart = await getCartByUserIDQuery(user.id);

    if (!cart?.id) {
      const { stores } = await getStoresQuery({});
      const store = getNearestStore({ stores, userLocation });

      await createCartQuery({
        userId: user.id,
        storeId: store?.id,
        itemsPrice: 0,
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
      isVerified: user.isVerified,
      role: user.role.name,
    };

    const token = sign(payload, String(API_KEY), { expiresIn: '1h' });

    return { user, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const refreshTokenAction = async (email: string) => {
  try {
    const user = await getUserByEmailQuery(email);

    if (!user) throw new HttpException(500, 'Something went wrong');

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
      isVerified: user.isVerified,
      role: user.role.name,
    };

    const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });

    return { user, token };
  } catch (err) {
    throw err;
  }
};

const verifyAction = async (data: Auth): Promise<void> => {
  try {
    const findUser = await getUserByEmailQuery(data.email);
    if (!findUser) throw new Error('User does not exist');
    const salt = await genSalt(10);

    const hashPass = await hash(data.password || '', salt);

    await verifyQuery({
      email: data.email,
      password: hashPass,
    });
  } catch (error) {
    console.log(error);
  }
};

const forgotPasswordAction = async (email: string): Promise<User> => {
  try {
    const findUser = await getUserByEmailQuery(email);
    if (!findUser) throw new Error('User does not exist');

    const user = await forgotPasswordQuery(email);

    return user;
  } catch (err) {
    throw err;
  }
};

export {
  registerAction,
  loginAction,
  verifyAction,
  refreshTokenAction,
  forgotPasswordAction,
};
