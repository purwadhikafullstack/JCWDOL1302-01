import { PrismaClient, Order } from '@prisma/client';
import {
  IOrder,
  IFilterOrder,
  IResultOrder,
} from '../interfaces/order.interface';
import { getCartByUserIDQuery, resetCartItemsQuery } from './cart.query';
import {
  getStockByProductIdAndStoreIdQuery,
  updateStockQuery,
} from './stock.query';
import { getDiscountsByStoreIDQuery } from './discount.query';
import { DISCOUNT_TYPE } from '@/constants/discount.constant';
import { createVoucherQuery } from './voucher.query';
import { ORDER_STATUS } from '@/constants/order.constant';

const prisma = new PrismaClient();

const getOrdersQuery = async (filters: IFilterOrder): Promise<IResultOrder> => {
  try {
    const {
      userId = '',
      storeId = '',
      keyword = '',
      page = 1,
      size = 1000,
    } = filters;
    const conditions: any = {
      orderNumber: {
        contains: keyword,
      },
    };
    if (userId) conditions.userId = userId;
    if (storeId) conditions.storeId = storeId;

    const orders = await prisma.order.findMany({
      include: {
        store: true,
        user: true,
        userAddress: true,
      },
      where: {
        ...conditions,
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.order.aggregate({
      _count: {
        id: true,
      },
      where: {
        ...conditions,
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { orders, pages };
  } catch (err) {
    throw err;
  }
};

const getOrderByIDQuery = async (id: string): Promise<Order | null> => {
  try {
    const order = await prisma.order.findUnique({
      include: {
        store: true,
        user: true,
        userAddress: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      where: {
        id,
      },
    });

    return order;
  } catch (err) {
    throw err;
  }
};

const createOrderQuery = async (data: IOrder): Promise<Order> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const order = await prisma.order.create({
          data: {
            ...data,
            orderItems: {
              createMany: {
                data: data.orderItems,
              },
            },
          },
        });

        // reset cart items
        const cart = await getCartByUserIDQuery(data.userId);
        if (cart) await resetCartItemsQuery(cart.id);

        // update stock
        for (const item of data.orderItems) {
          const stock = await getStockByProductIdAndStoreIdQuery(
            item.productId,
            data.storeId,
          );

          if (stock) {
            await updateStockQuery(stock.id, {
              type: 'kurang',
              stock: Number(item.quantity + (item.bonusQuantity || 0)),
            });
          }
        }

        // get discounts
        const discounts = await getDiscountsByStoreIDQuery(data.storeId);
        const storeDiscounts = discounts?.filter(discount => {
          return [
            DISCOUNT_TYPE.minimumPurchase,
            DISCOUNT_TYPE.freeShipping
          ].includes(discount.type);
        });
        const dataOrders = await getOrdersQuery({ userId: data.userId });
        const totalOrders = dataOrders.orders.length;

        // create vouchers
        for (const discount of storeDiscounts) {
          if (
            (
              discount.type === DISCOUNT_TYPE.minimumPurchase &&
              data.totalPrice >= Number(discount.minimumPrice)
            ) || (
              discount.type === DISCOUNT_TYPE.freeShipping &&
              totalOrders >= Number(discount.minimumOrders)
            )
          ) {
            await createVoucherQuery({
              userId: data.userId,
              discountId: discount.id,
            });
          }
        }

        return order;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const confirmShippingOrderQuery = async () => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const orders = await prisma.order.updateMany({
      where: {
        orderStatus: ORDER_STATUS.dikirim,
        shippingDate: {
          gt: twoDaysAgo,
        },
      },
      data: {
        orderStatus: ORDER_STATUS.pesananDikonfirmasi,
      },
    });
    return orders;
  } catch (err) {
    throw err;
  }
};

export {
  confirmShippingOrderQuery,
  getOrdersQuery,
  getOrderByIDQuery,
  createOrderQuery,
};
