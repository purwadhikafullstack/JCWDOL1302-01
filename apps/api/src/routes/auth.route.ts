import express from 'express';
import {
  registerController,
  loginController,
  verifyController,
  refreshTokenController,
  getTokenController,
  forgotPasswordController,
  resetPasswordController,
} from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/', verifyToken, refreshTokenController);
router.post('/', getTokenController);
router.post('/verify', verifyToken, verifyController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', verifyToken, resetPasswordController);

export default router;
