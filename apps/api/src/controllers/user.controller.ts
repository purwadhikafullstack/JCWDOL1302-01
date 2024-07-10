import { Request, Response, NextFunction } from 'express';
import {
  createUserAction,
  deleteUserAction,
  getUserByIDAction,
  getUsersAction,
  updateAvatarAction,
  updatePasswordAction,
  updateUserAction,
} from '../actions/user.action';

const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;

    const data = await getUsersAction(filters);

    res.status(200).json({
      message: 'Get users success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getUserByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getUserByIDAction(id);

    res.status(200).json({
      message: 'Get user success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await createUserAction(req.body);

    res.status(200).json({
      message: 'Create user success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await updateUserAction(id, data);

    res.status(200).json({
      message: 'Update user success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await updatePasswordAction(id, req.body);

    res.status(200).json({
      message: 'Update password success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updateAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { file } = req;

    const data = await updateAvatarAction(id, file?.filename as string);

    res.status(200).json({
      message: 'Update avatar success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteUserAction(id);

    res.status(200).json({
      message: 'Delete user success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  getUsersController,
  getUserByIDController,
  createUserController,
  updateUserController,
  updatePasswordController,
  updateAvatarController,
  deleteUserController,
};
