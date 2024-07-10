import { Request, Response, NextFunction } from 'express';
import {
  createCartItemAction,
  deleteCartItemAction,
  getCartByUserIDAction,
  resetCartItemsAction,
  updateCartAction,
} from '@/actions/cart.action';

const getCartByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getCartByUserIDAction(id);

    res.status(200).json({
      message: 'Get cart success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await updateCartAction(id, req.body);

    res.status(200).json({
      message: 'Update cart success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;
    const data = await createCartItemAction({
      ...params,
      quantity: Number(params.quantity),
    });

    res.status(200).json({
      message: 'Create cart item success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteCartItemAction(id);

    res.status(200).json({
      message: 'Delete cart item success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const resetCartItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cartId } = req.params;
    await resetCartItemsAction(cartId);

    res.status(200).json({
      message: 'Reset cart items success',
    });
  } catch (err) {
    next(err);
  }
};

export {
  updateCartController,
  createCartItemController,
  deleteCartItemController,
  getCartByUserIDController,
  resetCartItemsController,
};
