import { Request, Response, NextFunction } from 'express';
import {
  getSalesReportPerCategoryAction,
  getSalesReportPerMonthAction,
  getSalesReportPerProductAction,
} from '@/actions/report.action';

const getSalesReportPerMonthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportPerMonthAction(filters);

    res.status(200).json({
      message: 'Get sales report per month success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getSalesReportPerProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportPerProductAction(filters);

    res.status(200).json({
      message: 'Get sales report per product success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getSalesReportPerCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportPerCategoryAction(filters);

    res.status(200).json({
      message: 'Get sales report per category success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  getSalesReportPerMonthController,
  getSalesReportPerProductController,
  getSalesReportPerCategoryController,
};
