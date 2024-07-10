import { Request, Response, NextFunction } from 'express';
import {
  createStoreAction,
  createUserStoreAction,
  deleteStoreAction,
  deleteUserStoreAction,
  getDistanceStoresAction,
  getStoreByIDAction,
  getStoresAction,
  getUnassignedUsersByStoreIDAction,
  getUserStoresAction,
  getUsersByStoreIDAction,
  updateStoreAction,
  updateUserStoreAction,
} from '../actions/store.action';

const getStoresController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getStoresAction(filters);

    res.status(200).json({
      message: 'Get stores success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStoreByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getStoreByIDAction(id);

    res.status(200).json({
      message: 'Get store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getDistanceStoresController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getDistanceStoresAction(req.body);

    res.status(200).json({
      message: 'Get distance stores success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;

    const data = await createStoreAction({
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
      longitude: parseFloat(params.longitude),
      latitude: parseFloat(params.latitude),
    });

    res.status(200).json({
      message: 'Create store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createUserStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;

    const data = await createUserStoreAction({
      ...params,
    });

    res.status(200).json({
      message: 'Create User store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;

    const data = await updateStoreAction(id, {
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
      longitude: parseFloat(params.longitude),
      latitude: parseFloat(params.latitude),
    });

    res.status(200).json({
      message: 'Update store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteStoreAction(id);

    res.status(200).json({
      message: 'Delete store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getUnassignedUsersByStoreIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { storeId } = req.params;
    const data = await getUnassignedUsersByStoreIDAction(storeId);

    res.status(200).json({
      message: 'Get unassigned user success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getUsersByStoreIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { storeId } = req.params;
    const data = await getUsersByStoreIDAction(storeId);

    res.status(200).json({
      message: 'Get User store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getUserStoresController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { storeId } = req.params;
    const data = await getUserStoresAction(storeId);

    res.status(200).json({
      message: 'Get User store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteUserStoreAction(id);

    res.status(200).json({
      message: 'Delete user store success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await updateUserStoreAction(id, data);

    res.status(200).json({
      message: 'Update user success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export {
  updateUserStoreController,
  deleteUserStoreController,
  getUserStoresController,
  getUsersByStoreIDController,
  getUnassignedUsersByStoreIDController,
  getStoresController,
  getStoreByIDController,
  getDistanceStoresController,
  createStoreController,
  updateStoreController,
  deleteStoreController,
  createUserStoreController,
};
