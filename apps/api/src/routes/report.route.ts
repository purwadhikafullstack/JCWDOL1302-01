import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  getSalesReportPerCategoryController,
  getSalesReportPerMonthController,
  getSalesReportPerProductController,
  getSalesReportTotalCategoryController,
  getSalesReportTotalProductController,
  getStockReportDetailController,
  getStockReportPerMonthController,
} from '@/controllers/report.controller';

const router = express.Router();

router.get(
  '/sales/month',
  verifyToken,
  adminGuard,
  getSalesReportPerMonthController,
);

router.get(
  '/sales/product',
  verifyToken,
  adminGuard,
  getSalesReportPerProductController,
);

router.get(
  '/sales/category',
  verifyToken,
  adminGuard,
  getSalesReportPerCategoryController,
);

router.get(
  '/sales/product/total',
  verifyToken,
  adminGuard,
  getSalesReportTotalProductController,
);

router.get(
  '/sales/category/total',
  verifyToken,
  adminGuard,
  getSalesReportTotalCategoryController,
);

router.get(
  '/stock/month',
  verifyToken,
  adminGuard,
  getStockReportPerMonthController,
);

router.get(
  '/stock/detail',
  verifyToken,
  adminGuard,
  getStockReportDetailController,
);

export default router;
