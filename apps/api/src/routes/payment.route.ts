import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import { confirmPaymentController, createPaymentController, updatePaymentStatusController } from "@/controllers/payment.controller";
import { uploader } from "@/helpers/multer";

const router = express.Router();

router.post('/', verifyToken, createPaymentController);
router.patch('/status/:id', verifyToken, updatePaymentStatusController);
router.patch(
  '/confirm/:id',
  verifyToken,
  uploader('CONFIRM_', '/confirmation').single('paymentImage'),
  confirmPaymentController
);

export default router;