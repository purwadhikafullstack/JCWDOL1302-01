import { Category } from "@prisma/client";

export interface ICategory {
  name: string;
  slug: string;
}

export interface IFilterCategory {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultCategory {
  categories: Category[];
  pages: number;
}