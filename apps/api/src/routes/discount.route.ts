import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  createDiscountController,
  getDiscountByIDController,
  getDiscountByProductIdAndStoreIdController,
  getDiscountsController,
  getDiscountsByStoreIDController,
  updateDiscountController,
  deleteDiscountController,
} from '@/controllers/discount.controller';

const router = express.Router();

router.get('/', verifyToken, adminGuard, getDiscountsController);
router.post('/', verifyToken, adminGuard, createDiscountController);
router.get(
  '/store/:storeId',
  verifyToken,
  adminGuard,
  getDiscountsByStoreIDController,
);
router.get(
  '/product/:productId/store/:storeId',
  verifyToken,
  getDiscountByProductIdAndStoreIdController,
);
router.get('/:id', verifyToken, adminGuard, getDiscountByIDController);
router.patch('/:id', verifyToken, adminGuard, updateDiscountController);
router.delete('/:id', verifyToken, adminGuard, deleteDiscountController);

export default router;
