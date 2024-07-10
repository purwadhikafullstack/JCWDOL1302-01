import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import {
  createCartItemController,
  deleteCartItemController,
  getCartByUserIDController,
  resetCartItemsController,
  updateCartController,
} from '@/controllers/cart.controller';

const router = express.Router();

router.patch('/:id', verifyToken, updateCartController);
router.get('/user/:id', verifyToken, getCartByUserIDController);
router.post('/item', verifyToken, createCartItemController);
router.delete('/item/:id', verifyToken, deleteCartItemController);
router.delete('/items/:cartId', verifyToken, resetCartItemsController);

export default router;
