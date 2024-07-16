import {
  IDiscount,
  IFilterDiscount,
  IResultDiscount,
} from '@/interfaces/discount.interface';
import { Discount, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDiscountsQuery = async (
  filters: IFilterDiscount,
): Promise<IResultDiscount> => {
  try {
    const { storeId = '', keyword = '', page = 1, size = 1000 } = filters;

    const discounts = await prisma.discount.findMany({
      include: {
        product: true,
      },
      where: {
        type: {
          contains: keyword,
        },
        storeId: {
          contains: storeId,
        },
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.discount.aggregate({
      _count: {
        id: true,
      },
      where: {
        type: {
          contains: keyword,
        },
        storeId: {
          contains: storeId,
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { discounts, pages };
  } catch (err) {
    throw err;
  }
};

const createDiscountQuery = async (
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const discount = await prisma.discount.create({
          data: {
            type: discountData.type,
            amount: discountData.amount,
            unit: discountData.unit,
            minimumPrice: discountData.minimumPrice,
            maximumDiscount: discountData.maximumDiscount,
            minimumOrders: discountData.minimumOrders,
            storeId: discountData.storeId,
            productId: discountData.productId,
          },
        });

        return discount;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const getDiscountsByStoreIDQuery = async (
  storeId: string,
): Promise<Discount[]> => {
  try {
    const discounts = await prisma.discount.findMany({
      include: {
        product: true,
      },
      where: {
        storeId,
      },
    });

    return discounts;
  } catch (err) {
    throw err;
  }
};

const getDiscountByIDQuery = async (id: string): Promise<Discount | null> => {
  try {
    const discount = await prisma.discount.findUnique({
      where: {
        id,
      },
    });

    return discount;
  } catch (err) {
    throw err;
  }
};

const getDiscountByProductIdAndStoreIdQuery = async (
  productId: string,
  storeId: string,
): Promise<Discount | null> => {
  try {
    const discount = await prisma.discount.findFirst({
      where: {
        productId,
        storeId,
      },
    });

    return discount;
  } catch (err) {
    throw err;
  }
};

const updateDiscountQuery = async (
  id: string,
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const discount = await prisma.discount.update({
          data: {
            type: discountData.type,
            amount: discountData.amount,
            unit: discountData.unit,
            minimumPrice: discountData.minimumPrice,
            maximumDiscount: discountData.maximumDiscount,
            minimumOrders: discountData.minimumOrders,
            storeId: discountData.storeId,
            productId: discountData.productId,
          },
          where: {
            id,
          },
        });

        return discount;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const deleteDiscountQuery = async (id: string): Promise<Discount> => {
  try {
    const discount = await prisma.discount.delete({
      where: {
        id,
      },
    });

    return discount;
  } catch (err) {
    throw err;
  }
};

export {
  deleteDiscountQuery,
  updateDiscountQuery,
  getDiscountByIDQuery,
  createDiscountQuery,
  getDiscountsQuery,
  getDiscountsByStoreIDQuery,
  getDiscountByProductIdAndStoreIdQuery,
};
