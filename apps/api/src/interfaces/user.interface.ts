import { User } from '@prisma/client';

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string;
  gender?: string;
  birthDate?: Date;
  role?: string;
  longitude?: number;
  latitude?: number;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string;
  gender?: string;
  birthDate?: Date;
  longitude?: number;
  latitude?: number;
}

export interface IUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IFilterUser {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultUser {
  users: User[];
  pages: number;
}
