import { HttpException } from '@/exceptions/HttpException';
import {
  IDiscount,
  IFilterDiscount,
  IResultDiscount,
} from '@/interfaces/discount.interface';
import {
  createDiscountQuery,
  getDiscountByIDQuery,
  getDiscountByProductIdAndStoreIdQuery,
  getDiscountsQuery,
  getDiscountsByStoreIDQuery,
  updateDiscountQuery,
  deleteDiscountQuery,
} from '@/queries/discount.query';
import { Discount } from '@prisma/client';

const createDiscountAction = async (
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const discount = await createDiscountQuery(discountData);
    return discount;
  } catch (err) {
    throw err;
  }
};

const getDiscountsAction = async (
  filters: IFilterDiscount,
): Promise<IResultDiscount> => {
  try {
    const data = await getDiscountsQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getDiscountsByStoreIDAction = async (
  storeId: string,
): Promise<Discount[]> => {
  try {
    const discounts = await getDiscountsByStoreIDQuery(storeId);

    if (!discounts) throw new HttpException(404, 'Data not found');

    return discounts;
  } catch (err) {
    throw err;
  }
};

const getDiscountByIDAction = async (id: string): Promise<Discount | null> => {
  try {
    const discounts = await getDiscountByIDQuery(id);

    if (!discounts) throw new HttpException(404, 'Data not found');

    return discounts;
  } catch (err) {
    throw err;
  }
};

const getDiscountByProductIdAndStoreIdAction = async (
  productId: string,
  storeId: string,
): Promise<Discount | null> => {
  try {
    if (!productId || !storeId)
      throw new Error('Please fill product ID and store ID');

    const discount = await getDiscountByProductIdAndStoreIdQuery(
      productId,
      storeId,
    );
    if (!discount) throw new HttpException(404, 'Data not found');

    return discount;
  } catch (err) {
    throw err;
  }
};

const updateDiscountAction = async (
  id: string,
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const discount = await updateDiscountQuery(id, discountData);
    return discount;
  } catch (err) {
    throw err;
  }
};

const deleteDiscountAction = async (id: string): Promise<Discount> => {
  try {
    const discount = await deleteDiscountQuery(id);
    return discount;
  } catch (err) {
    throw err;
  }
};

export {
  deleteDiscountAction,
  updateDiscountAction,
  getDiscountByIDAction,
  createDiscountAction,
  getDiscountsAction,
  getDiscountsByStoreIDAction,
  getDiscountByProductIdAndStoreIdAction,
};
