import { PrismaClient, Order } from "@prisma/client";
import { ORDER_STATUS } from "@/constants/order.constant";

const prisma = new PrismaClient();

const sendOrderQuery = async (orderId: string): Promise<Order> => {
  try {
    const order = await prisma.order.update({
      data: {
        orderStatus: ORDER_STATUS.dikirim,
        shippingDate: new Date(),
      },
      where: {
        id: orderId
      }
    });

    return order;
  } catch (err) {
    throw err;
  }
};

export {
  sendOrderQuery,
}