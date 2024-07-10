import { Store } from '@prisma/client';

export interface IStore {
  name: string;
  address: string;
  subdistrictId: number;
  subdistrictName: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  postalCode?: string;
  longitude?: number;
  latitude?: number;
}

export interface IUserStore {
  storeId: string;
  userId: string;
}

export interface IUserLocation {
  longitude?: number;
  latitude?: number;
}

export interface IFilterStore {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultStore {
  stores: Store[];
  pages: number;
}
