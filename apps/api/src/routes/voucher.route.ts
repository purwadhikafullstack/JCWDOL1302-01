import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import { createVoucherController, getVouchersByUserIDController } from "@/controllers/voucher.controller";

const router = express.Router();

router.get(
  '/user/:userId',
  verifyToken,
  getVouchersByUserIDController,
);
router.post('/', verifyToken, createVoucherController);

export default router;
