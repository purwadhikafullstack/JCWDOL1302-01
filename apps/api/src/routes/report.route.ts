import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  getSalesReportPerCategoryController,
  getSalesReportPerMonthController,
  getSalesReportPerProductController,
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

export default router;
