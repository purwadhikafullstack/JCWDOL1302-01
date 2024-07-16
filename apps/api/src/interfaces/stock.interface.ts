import { Stock } from '@prisma/client';

export interface IStock {
  storeId: string;
  productId: string;
  type: string;
  stock: number;
  userId?: string;
}

export interface IUpdateStock {
  type: string;
  stock: number;
  userId?: string;
}

export interface IFilterStock {
  storeId?: string;
  productId?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultStock {
  stocks: Stock[];
  pages: number;
}
