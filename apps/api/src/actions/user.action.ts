import { HttpException } from '@/exceptions/HttpException';
import {
  createUserQuery,
  deleteUserQuery,
  getUserByEmailQuery,
  getUserByIDQuery,
  getUsersQuery,
  updateAvatarQuery,
  updatePasswordQuery,
  updateUserQuery,
} from '../queries/user.query';
import {
  IFilterUser,
  IResultUser,
  IUpdatePassword,
  IUser,
} from '@/interfaces/user.interface';
import { User } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';

const getUsersAction = async (filters: IFilterUser): Promise<IResultUser> => {
  try {
    const users = await getUsersQuery(filters);
    return users;
  } catch (err) {
    throw err;
  }
};

const getUserByIDAction = async (id: string): Promise<User | null> => {
  try {
    const user = await getUserByIDQuery(id);

    if (!user) throw new HttpException(404, 'Data not found');

    return user;
  } catch (err) {
    throw err;
  }
};

const createUserAction = async (userData: IUser): Promise<User> => {
  try {
    const existUser = await getUserByEmailQuery(userData.email as string);

    if (existUser) throw new Error('User already exists');

    const user = await createUserQuery(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUserAction = async (id: string, data: IUser): Promise<User> => {
  try {
    const user = await updateUserQuery(id, data);
    return user;
  } catch (err) {
    throw err;
  }
};

const updatePasswordAction = async (
  id: string,
  data: IUpdatePassword,
): Promise<User> => {
  try {
    const user = await getUserByIDQuery(id);
    if (!user) throw new Error('User doesnt exist');

    const isValid = await compare(data.currentPassword, user.password || '');

    if (!isValid) throw new Error('Current password is wrong');

    const salt = await genSalt(10);
    const hashPass = await hash(data.newPassword || '', salt);
    const updatedUser = await updatePasswordQuery(id, hashPass);

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const updateAvatarAction = async (id: string, image: string): Promise<User> => {
  try {
    if (!image) throw new Error('Please upload image file');

    const user = await updateAvatarQuery(id, image);
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteUserAction = async (id: string): Promise<User> => {
  try {
    const user = await deleteUserQuery(id);
    return user;
  } catch (err) {
    throw err;
  }
};

export {
  getUsersAction,
  getUserByIDAction,
  createUserAction,
  updateUserAction,
  updatePasswordAction,
  updateAvatarAction,
  deleteUserAction,
};
