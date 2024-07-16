import { Order } from "@prisma/client";

export interface IOrder {
  orderNumber: string;
  userId: string;
  userAddressId: string;
  storeId: string;
  itemsPrice: number;
  shippingPrice: number;
  itemsDiscount: number;
  shippingDiscount: number;
  voucherDiscount: number;
  referralDiscount: number;
  totalPrice: number;
  paymentMethod: string;
  shippingCourier: string;
  shippingService: string;
  vouchers?: string[];
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  quantity: number;
  bonusQuantity?: number;
  price: number;
  discount?: number;
}

export interface IFilterOrder {
  userId?: string;
  storeId?: string;
  startDate?: string;
  endDate?: string;
  orderStatus?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultOrder {
  orders: Order[];
  pages: number;
}