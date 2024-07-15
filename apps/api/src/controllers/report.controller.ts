import { Request, Response, NextFunction } from 'express';
import {
  getSalesReportPerCategoryAction,
  getSalesReportPerMonthAction,
  getSalesReportPerProductAction,
  getSalesReportTotalCategoryAction,
  getSalesReportTotalProductAction,
  getStockReportDetailAction,
  getStockReportPerMonthAction,
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

const getSalesReportTotalProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportTotalProductAction(filters);

    res.status(200).json({
      message: 'Get sales report total product success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getSalesReportTotalCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportTotalCategoryAction(filters);

    res.status(200).json({
      message: 'Get sales report total category success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStockReportPerMonthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getStockReportPerMonthAction(filters);

    res.status(200).json({
      message: 'Get stock report per month success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStockReportDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getStockReportDetailAction(filters);

    res.status(200).json({
      message: 'Get stock report detail success',
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
  getSalesReportTotalProductController,
  getSalesReportTotalCategoryController,
  getStockReportPerMonthController,
  getStockReportDetailController,
};
