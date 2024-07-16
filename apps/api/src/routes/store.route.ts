import express from 'express';
import {
  createStoreController,
  createUserStoreController,
  deleteStoreController,
  deleteUserStoreController,
  getDistanceStoresController,
  getNearestStoreController,
  getStoreByIDController,
  getStoresController,
  getUnassignedUsersByStoreIDController,
  getUserStoresController,
  getUsersByStoreIDController,
  updateStoreController,
  updateUserStoreController,
} from '../controllers/store.controller';
import { superAdminGuard, verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.get('/', getStoresController);
router.get('/:id', getStoreByIDController);
router.get(
  '/users/:id',
  verifyToken,
  superAdminGuard,
  getUsersByStoreIDController,
);
router.get(
  '/users/assigned/:storeId',
  verifyToken,
  superAdminGuard,
  getUserStoresController,
);
router.post('/', verifyToken, superAdminGuard, createStoreController);
router.get(
  '/users/unassigned/:storeId',
  verifyToken,
  superAdminGuard,
  getUnassignedUsersByStoreIDController,
);
router.post('/users', verifyToken, superAdminGuard, createUserStoreController);
router.post('/distance', verifyToken, getDistanceStoresController);
router.post('/nearest', getNearestStoreController);
router.patch('/:id', verifyToken, superAdminGuard, updateStoreController);
router.patch('/:id', verifyToken, superAdminGuard, updateUserStoreController);
router.delete('/:id', verifyToken, superAdminGuard, deleteStoreController);
router.delete(
  '/users/:id',
  verifyToken,
  superAdminGuard,
  deleteUserStoreController,
);

export default router;
