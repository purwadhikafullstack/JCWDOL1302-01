import Xendit from "xendit-node";
import { MidtransClient } from 'midtrans-node-client';
import { CURRENCY, FAILURE_REDIRECT_URL, PAYMENT_DESCRIPTION, PAYMENT_PRODUCTION, SHOULD_SEND_EMAIL, SUCCESS_REDIRECT_URL } from "@/constants/payment.constant";
import { PrismaClient, Order } from "@prisma/client";
import { ORDER_STATUS } from "@/constants/order.constant";
import { returnOrderStocksQuery } from "./stock.query";

const prisma = new PrismaClient();

const createXenditInvoiceQuery = async (order: any) => {
  const xendit = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY as string
  });

  const { Invoice } = xendit;
  const invoiceSpecificOptions = {};
  const inv = new Invoice(invoiceSpecificOptions);

  const data = {
    externalID: order.orderNumber,
    payerEmail: order.user.email as string,
    description: PAYMENT_DESCRIPTION,
    amount: order.totalPrice,
    shouldSendEmail: SHOULD_SEND_EMAIL,
    successRedirectURL: `${SUCCESS_REDIRECT_URL}/${order.id}`,
    failureRedirectURL: `${FAILURE_REDIRECT_URL}/${order.id}`,
    paymentMethods: [String(order.paymentMethod).toUpperCase()],
    currency: CURRENCY
  };

  const invoice = await inv.createInvoice(data);
  return invoice;
}

const createMidtransTransactionQuery = async (order: any) => {
  const snap = new MidtransClient.Snap({
    isProduction: PAYMENT_PRODUCTION,
    serverKey: process.env.MIDTRANS_SERVER_KEY as string,
    clientKey: process.env.MIDTRANS_CLIENT_KEY as string
  });

  const data = {
    payment_type: String(order.paymentMethod).toLowerCase(),
    transaction_details: {
      order_id: order.orderNumber,
      gross_amount: order.totalPrice
    },
    customer_details: {
      first_name: order.user.name,
      last_name: "",
      email: order.user.email,
      phone: order.user.phone,
      billing_address: {
        address: order.userAddress.address,
        city: order.userAddress.cityName,
        postal_code: order.userAddress.postalCode
      }
    }
  };

  const redirectURL = await snap.createTransactionRedirectUrl(data);
  return { redirectURL };
}

const updatePaymentStatusQuery = async (orderId: string, orderStatus: string): Promise<Order> => {
  try {
    let data: any = {
      orderStatus,
    }

    if (orderStatus === ORDER_STATUS.diproses) {
      data = {
        ...data,
        paymentDate: new Date(),
      }
    }

    const order = await prisma.order.update({
      data: {
        ...data,
      },
      where: {
        id: orderId
      }
    });

    if (orderStatus === ORDER_STATUS.dibatalkan) {
      await returnOrderStocksQuery(order);
    }

    return order;
  } catch (err) {
    throw err;
  }
};

const confirmPaymentQuery = async (orderId: string, paymentImage: string): Promise<Order> => {
  try {
    const order = await prisma.order.update({
      data: {
        orderStatus: ORDER_STATUS.menungguKonfirmasiPembayaran,
        paymentImage,
        paymentDate: new Date(),
      },
      where: {
        id: orderId,
      }
    });

    return order;
  } catch (err) {
    throw err;
  }
};

export {
  createXenditInvoiceQuery,
  createMidtransTransactionQuery,
  updatePaymentStatusQuery,
  confirmPaymentQuery,
}