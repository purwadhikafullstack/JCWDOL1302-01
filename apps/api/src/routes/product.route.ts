import express from 'express';
import {
  createProductController,
  createProductImageController,
  deleteProductController,
  deleteProductImageController,
  getProductByIDController,
  getProductBySlugController,
  getProductsController,
  updateProductController,
} from '../controllers/product.controller';
import { superAdminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { uploader } from '@/helpers/multer';

const router = express.Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIDController);
router.get('/slug/:slug', getProductBySlugController);
router.post('/', verifyToken, superAdminGuard, createProductController);
router.patch('/:id', verifyToken, superAdminGuard, updateProductController);
router.delete('/:id', verifyToken, superAdminGuard, deleteProductController);
router.post(
  '/image',
  verifyToken,
  superAdminGuard,
  uploader('IMG_', '/products').single('image'),
  createProductImageController,
);
router.delete(
  '/image/:id',
  verifyToken,
  superAdminGuard,
  deleteProductImageController,
);

export default router;
