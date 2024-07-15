import express from 'express';
import {
  createUserController,
  deleteUserController,
  getUserByIDController,
  getUsersController,
  updateUserController,
  updateAvatarController,
  updatePasswordController,
} from '../controllers/user.controller';
import { uploader } from '@/helpers/multer';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIDController);
router.post('/', verifyToken, adminGuard, createUserController);
// add adminGuard for update user store admin
router.patch('/:id', verifyToken, updateUserController);
router.patch('/:id/password', verifyToken, updatePasswordController);
router.patch(
  '/:id/avatar',
  verifyToken,
  uploader('AVATAR_', '/avatar', ['.jpg', '.jpeg', '.png', '.gif']).single(
    'image',
  ),
  updateAvatarController,
);
router.delete('/:id', verifyToken, adminGuard, deleteUserController);

export default router;
