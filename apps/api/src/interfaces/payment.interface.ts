export interface IPayment {
  orderId: string;
  userId?: string;
}

export interface IPaymentStatus {
  orderId: string;
  orderStatus: string;
}
