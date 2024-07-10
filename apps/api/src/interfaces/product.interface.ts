import { Product } from '@prisma/client';

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  image?: string;
  price: number;
  createdBy?: string;
  updatedBy?: string;
  categoryId: string;
}

export interface IProductImage {
  productId: string;
  image: string;
}

export interface IFilterProduct {
  category?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultProduct {
  products: Product[];
  pages: number;
}
