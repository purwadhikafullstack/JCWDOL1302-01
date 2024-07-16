import { PrismaClient, Product, ProductImage } from '@prisma/client';
import {
  IFilterProduct,
  IProduct,
  IProductImage,
  IResultProduct,
} from '../interfaces/product.interface';

const prisma = new PrismaClient();

const getProductsQuery = async (
  filters: IFilterProduct,
): Promise<IResultProduct> => {
  try {
    const { category = '', keyword = '', page = 1, size = 1000 } = filters;

    const products = await prisma.product.findMany({
      include: {
        category: true,
        productImages: true,
      },
      where: {
        name: {
          contains: keyword,
        },
        category: {
          slug: {
            contains: category,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.product.aggregate({
      _count: {
        id: true,
      },
      where: {
        name: {
          contains: keyword,
        },
        category: {
          slug: {
            contains: category,
          },
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { products, pages };
  } catch (err) {
    throw err;
  }
};

const getAvailableProductsByStoreIDQuery = async (
  filters: IFilterProduct,
): Promise<IResultProduct> => {
  try {
    const {
      storeId = '',
      category = '',
      keyword = '',
      page = 1,
      size = 1000,
    } = filters;

    const products = await prisma.product.findMany({
      include: {
        category: true,
        productImages: true,
      },
      where: {
        name: {
          contains: keyword,
        },
        category: {
          slug: {
            contains: category,
          },
        },
        stocks: {
          some: {
            storeId,
            remainingStock: {
              gt: 0,
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.product.aggregate({
      _count: {
        id: true,
      },
      where: {
        name: {
          contains: keyword,
        },
        category: {
          slug: {
            contains: category,
          },
        },
        stocks: {
          some: {
            storeId,
            remainingStock: {
              gt: 0,
            },
          },
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { products, pages };
  } catch (err) {
    throw err;
  }
};

const getProductByIDQuery = async (id: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        category: true,
        productImages: true,
      },
      where: {
        id,
      },
    });

    return product;
  } catch (err) {
    throw err;
  }
};

const getProductBySlugOrNameQuery = async (
  slug: string,
  name: string,
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        category: true,
        productImages: true,
      },
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

    return product;
  } catch (err) {
    throw err;
  }
};

const createProductQuery = async (productData: IProduct): Promise<Product> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const product = await prisma.product.create({
          data: {
            ...productData,
          },
        });

        return product;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateProductQuery = async (
  id: string,
  productData: IProduct,
): Promise<Product> => {
  try {
    const product = await prisma.product.update({
      data: {
        ...productData,
      },
      where: {
        id,
      },
    });

    return product;
  } catch (err) {
    throw err;
  }
};

const deleteProductQuery = async (id: string): Promise<Product> => {
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return product;
  } catch (err) {
    throw err;
  }
};

const createProductImageQuery = async (
  data: IProductImage,
): Promise<ProductImage> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const productImage = await prisma.productImage.create({
          data: {
            ...data,
          },
        });

        return productImage;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const deleteProductImageQuery = async (id: string): Promise<ProductImage> => {
  try {
    const productImage = await prisma.productImage.delete({
      where: {
        id,
      },
    });

    return productImage;
  } catch (err) {
    throw err;
  }
};

export {
  getProductsQuery,
  getProductByIDQuery,
  getProductBySlugOrNameQuery,
  createProductQuery,
  updateProductQuery,
  deleteProductQuery,
  createProductImageQuery,
  deleteProductImageQuery,
  getAvailableProductsByStoreIDQuery,
};
