import { createVoucherAction, getVouchersByUserIDAction } from "@/actions/voucher.action";
import { Request, Response, NextFunction } from 'express';

const getVouchersByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const data = await getVouchersByUserIDAction(userId);

    res.status(200).json({
      message: 'Get vouchers success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createVoucherController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;
    const data = await createVoucherAction(params);

    res.status(200).json({
      message: 'Create voucher success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  getVouchersByUserIDController,
  createVoucherController,
};
