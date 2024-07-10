import { confirmPaymentAction, createPaymentAction, updatePaymentStatusAction } from "@/actions/payment.action";
import { Request, Response, NextFunction } from 'express';

const createPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderId = req.body.orderId;
    const data = await createPaymentAction(orderId);

    res.status(200).json({
      message: 'Create payment success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updatePaymentStatusController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const data = await updatePaymentStatusAction(id, orderStatus);

    res.status(200).json({
      message: "Update payment status success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const confirmPaymentController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { file } = req;
    const data = await confirmPaymentAction(id, file?.filename as string);

    res.status(200).json({
      message: "Confirm payment success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  createPaymentController,
  updatePaymentStatusController,
  confirmPaymentController,
};