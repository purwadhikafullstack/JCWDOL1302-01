import { Discount } from '@prisma/client';

export interface IDiscount {
  type: string;
  amount: number;
  unit: string;
  minimumPrice: number;
  maximumDiscount: number;
  minimumOrders: number;
  storeId: string;
  productId: string;
}

export interface IFilterDiscount {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultDiscount {
  discounts: Discount[];
  pages: number;
}
