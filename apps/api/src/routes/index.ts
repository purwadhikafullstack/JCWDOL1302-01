import type { Application } from "express";
import authRouter from './auth.route';
import userRouter from './user.route';
import addressRouter from './address.route';
import storeRouter from './store.route';
import categoryRouter from './category.route';
import productRouter from './product.route';
import stocksRouter from './stock.route';
import cartRouter from './cart.route';
import shippingRouter from './shipping.route';
import orderRouter from './order.route';
import paymentRouter from './payment.route';
import discountsRouter from './discount.route';
import reportRouter from './report.route';
import voucherRouter from './voucher.route';

module.exports = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/addresses', addressRouter);
  app.use('/stores', storeRouter);
  app.use('/categories', categoryRouter);
  app.use('/products', productRouter);
  app.use('/stocks', stocksRouter);
  app.use('/cart', cartRouter);
  app.use('/shipping', shippingRouter);
  app.use('/orders', orderRouter);
  app.use('/payment', paymentRouter);
  app.use('/discounts', discountsRouter);
  app.use('/report', reportRouter);
  app.use('/vouchers', voucherRouter);
}