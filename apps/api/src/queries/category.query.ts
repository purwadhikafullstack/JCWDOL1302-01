import { PrismaClient, Category } from '@prisma/client';
import {
  ICategory,
  IFilterCategory,
  IResultCategory,
} from '../interfaces/category.interface';

const prisma = new PrismaClient();

const getCategoriesQuery = async (
  filters: IFilterCategory,
): Promise<IResultCategory> => {
  try {
    const { keyword = '', page = 1, size = 1000 } = filters;

    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      orderBy: {
        name: 'asc',
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.category.aggregate({
      _count: {
        id: true,
      },
      where: {
        name: {
          contains: keyword,
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { categories, pages };
  } catch (err) {
    throw err;
  }
};

const getCategoryByIDQuery = async (id: string): Promise<Category | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  } catch (err) {
    throw err;
  }
};

const getCategoryBySlugOrNameQuery = async (
  slug: string,
  name: string,
): Promise<Category | null> => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          {
            slug,
          },
          {
            name,
          },
        ],
      },
    });

    return category;
  } catch (err) {
    throw err;
  }
};

const createCategoryQuery = async (
  categoryData: ICategory,
): Promise<Category> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const category = await prisma.category.create({
          data: {
            ...categoryData,
          },
        });

        return category;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateCategoryQuery = async (
  id: string,
  categoryData: ICategory,
): Promise<Category> => {
  try {
    const category = await prisma.category.update({
      data: {
        ...categoryData,
      },
      where: {
        id,
      },
    });

    return category;
  } catch (err) {
    throw err;
  }
};

const deleteCategoryQuery = async (id: string): Promise<Category> => {
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (err) {
    throw err;
  }
};

export {
  getCategoriesQuery,
  getCategoryByIDQuery,
  getCategoryBySlugOrNameQuery,
  createCategoryQuery,
  updateCategoryQuery,
  deleteCategoryQuery,
};
