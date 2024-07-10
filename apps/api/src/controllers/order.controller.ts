import { Request, Response, NextFunction } from 'express';
import {
  createOrderAction,
  getOrderByIDAction,
  getOrdersAction,
} from '@/actions/order.action';

const getOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getOrdersAction(filters);

    res.status(200).json({
      message: 'Get orders success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getOrderByIDAction(id);

    res.status(200).json({
      message: 'Get order success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;
    const data = await createOrderAction({
      ...params,
    });

    res.status(200).json({
      message: 'Create order success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export { getOrdersController, getOrderByIDController, createOrderController };
